(function () {
  'use strict';

  /* ==================== 1. CCF 目录数据（第七版，2026） ====================
     每行: [简称, 全称, 类型(j=期刊/c=会议), 等级(A/B/C), 所属领域]
  */
  const CCF_RAW = /*__CCF_DATA__*/[];

  /* ==================== 2. 匹配核心（纯函数，便于测试） ==================== */

  const TYPE_NAME = { j: '期刊', c: '会议' };
  const RANK_VAL = { A: 3, B: 2, C: 1 };

  // 归一化时丢弃的虚词 / 常见前缀词（目录名与网页文本两侧同时丢弃）
  const STOP = new Set(('the a an of on for and in at to with from by its proceedings proc annual international ieee acm')
    .split(' '));

  // 去掉词尾复数（两侧同做，用于容忍 Communication/Communications、System/Systems）
  function stem(t) {
    if (t.length > 3 && t.charCodeAt(t.length - 1) === 115 && t.charCodeAt(t.length - 2) !== 115) {
      return t.slice(0, -1);
    }
    return t;
  }

  // 把粘连的驼峰写法拆开：ACMSIGMODConference -> ACMSIGMOD Conference，VLDBJournal -> VLDB Journal
  function splitCamel(s) {
    return String(s)
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  }

  // 归一化成 token 序列。目录名里有 ACMSIGPLAN 这种粘连写法，需要拆驼峰；
  // 网页文本是正常排版（且可能写成 "EXperiments"），不再拆，避免把词拆碎。
  function tokensOf(s, doSplit) {
    if (!s) return [];
    const base = doSplit ? splitCamel(s) : String(s);
    const words = base.match(/[A-Za-z0-9]+/g) || [];
    const out = [];
    for (let i = 0; i < words.length; i++) {
      let t = words[i].toLowerCase();
      if (STOP.has(t)) continue;
      if (/^\d+(?:st|nd|rd|th)?$/.test(t)) continue;
      t = t.replace(/acm/g, '').replace(/ieee/g, ''); // 目录里有 ACMSIGPLAN 这类粘连写法
      if (!t) continue;
      out.push(stem(t));
    }
    return out;
  }

  function letters(toks) {
    let n = 0;
    for (let i = 0; i < toks.length; i++) n += toks[i].length;
    return n;
  }

  const ENTRIES = CCF_RAW.map(function (r) {
    return { abbr: r[0], full: r[1], type: r[2], rank: r[3], cat: r[4] };
  });

  function cleanAbbr(a) {
    return String(a || '').replace(/[（(][^）)]*[）)]/g, '').trim();
  }

  const byAbbr = new Map();
  ENTRIES.forEach(function (e) {
    const k = cleanAbbr(e.abbr);
    if (!k) return;
    const old = byAbbr.get(k);
    if (!old || RANK_VAL[e.rank] > RANK_VAL[old.rank]) byAbbr.set(k, e);
  });

  /* --- 全称索引：按词序列“后缀对齐 + 覆盖率”匹配 --- */
  const ALIAS_FULL = {
    'USENIX ATC': 'ACMSIGOPSATC',
    'USENIX Annual Technical Conference': 'ACMSIGOPSATC',
    'Networked Systems Design and Implementation': 'NSDI',
    'Proceedings of the VLDB Endowment': 'VLDB',
    'Management of Data': 'SIGMOD',
    'Conference on Applications, Technologies, Architectures, and Protocols for Computer Communications': 'SIGCOMM',
    'IEEE Conference on Computer Communications': 'INFOCOM',
    'ACM SIGKDD International Conference on Knowledge Discovery and Data Mining': 'SIGKDD',
    'International World Wide Web Conference': 'WWW',
    'The Web Conference': 'WWW',
    'Advances in Neural Information Processing Systems': 'NeurIPS',
    'Conference on Empirical Methods in Natural Language Processing': 'EMNLP',
    'Annual Meeting of the Association for Computational Linguistics': 'ACL',
    'IEEE Conference on Computer Vision and Pattern Recognition': 'CVPR',
    'European Conference on Computer Vision': 'ECCV'
  };

  const patMap = new Map(); // 字母串 -> { toks, e }
  let fullIndex = [];
  // 名字太短/太通用的条目（Networks、Cognition）不适合做模式匹配，
  // 但可以在“整段名字恰好等于它”时标记为“存疑”，避免误说成“未收录”。
  const genericMap = new Map();

  function addFull(name, e) {
    const toks = tokensOf(name, true);
    if (!toks.length) return;
    const key = toks.join('|');
    if (letters(toks) < 10) {
      const abbr = cleanAbbr(e.abbr);
      if (abbr !== 'JACM' && abbr !== 'Proc.IEEE') {
        const old = genericMap.get(key);
        if (!old || RANK_VAL[old.rank] < RANK_VAL[e.rank]) genericMap.set(key, e);
      }
      return;
    }
    const old = patMap.get(key);
    if (old && RANK_VAL[old.e.rank] >= RANK_VAL[e.rank]) return;
    patMap.set(key, { toks: toks, e: e });
  }
  ENTRIES.forEach(function (e) {
    addFull(e.full, e);
    const m = e.full.match(/[（(](?:原)?([^）)]+)[）)]/);
    if (m) addFull(m[1], e);
    const bare = e.full.replace(/[（(][^）)]*[）)]/g, ' ');
    if (bare !== e.full) addFull(bare, e);
  });
  Object.keys(ALIAS_FULL).forEach(function (alias) {
    const e = byAbbr.get(ALIAS_FULL[alias]);
    if (e) addFull(alias, e);
  });
  patMap.forEach(function (v) { fullIndex.push([v.toks, v.e, letters(v.toks)]); });
  fullIndex.sort(function (a, b) { return b[2] - a[2]; });

  /* --- 简称索引：按大写 token 匹配 --- */
  // 只接受“像缩写”的简称：全大写、含数字、驼峰（MobiCom/EuroSys/HotNets），
  // 排除 Networking / Internetware 这类普通单词，避免误伤长全称里的普通单词。
  function isAbbrLike(a) {
    if (!a) return false;
    if (/\s/.test(a)) return a.split(/\s+/).every(function (w) { return /^[A-Z0-9&+\/.-]{2,}$/.test(w); });
    if (!/^[A-Za-z0-9&+\/.-]+$/.test(a)) return false;
    if (/\d/.test(a)) return true;
    if (/[a-z]/.test(a) && !/[a-z][A-Z]/.test(a)) return false;
    return /[A-Z]{2,}/.test(a) || /[a-z][A-Z]/.test(a);
  }

  const abbrMap = new Map();
  function addAbbr(a, e) {
    const key = String(a || '').replace(/^CCF[-\s]*/i, '').replace(/\s+/g, ' ').trim();
    if (!isAbbrLike(key)) return;
    const old = abbrMap.get(key);
    if (old && RANK_VAL[old.rank] >= RANK_VAL[e.rank]) return;
    abbrMap.set(key, e);
  }
  ENTRIES.forEach(function (e) {
    addAbbr(cleanAbbr(e.abbr), e);
    const m = e.abbr.match(/[（(](?:原)?([^）)]+)[）)]/);
    if (m) addAbbr(cleanAbbr(m[1]), e);
  });
  const ALIAS_ABBR = {
    'USENIX ATC': 'ACMSIGOPSATC',
    'ATC': 'ACMSIGOPSATC',
    'PVLDB': 'VLDB',
    'KDD': 'SIGKDD',
    'NIPS': 'NeurIPS'
  };
  Object.keys(ALIAS_ABBR).forEach(function (k) {
    const e = byAbbr.get(ALIAS_ABBR[k]);
    if (e) addAbbr(k, e);
  });

  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  let ABBR_RE = null;
  function abbrRegex() {
    if (ABBR_RE) return ABBR_RE;
    const keys = Array.from(abbrMap.keys()).sort(function (a, b) { return b.length - a.length; });
    ABBR_RE = new RegExp('(?<![A-Za-z0-9])(' + keys.map(escRe).join('|') + ')(?![A-Za-z0-9])', 'g');
    return ABBR_RE;
  }

  // 覆盖率下限：目录全称至少要占结果中会议/期刊字段 55% 的字母，
  // 防止 “…Conference on Computer and Communication Systems” 被当成 INFOCOM。
  const MIN_COVER = 0.55;

  function matchFull(textToks) {
    if (!textToks.length) return null;
    const total = letters(textToks);
    for (let i = 0; i < fullIndex.length; i++) {
      const pat = fullIndex[i][0];
      if (pat.length > textToks.length) continue;
      const off = textToks.length - pat.length;
      let same = true;
      for (let j = 0; j < pat.length; j++) {
        if (textToks[off + j] !== pat[j]) { same = false; break; }
      }
      if (!same) continue;
      if (fullIndex[i][2] / total < MIN_COVER) continue;
      return fullIndex[i][1];
    }
    return null;
  }

  function matchAbbr(raw) {
    if (!raw) return null;
    const re = abbrRegex();
    re.lastIndex = 0;
    let best = null, bestLen = 0, m;
    while ((m = re.exec(raw)) !== null) {
      const e = abbrMap.get(m[1]);
      if (!e) continue;
      if (m[1].length > bestLen) { best = e; bestLen = m[1].length; }
      else if (m[1].length === bestLen && best && RANK_VAL[e.rank] > RANK_VAL[best.rank]) best = e;
    }
    return best;
  }

  // Google Scholar 的 .gs_a 形如 “作者 - 会议/期刊, 年份 - 站点域名”
  function venuePart(whole) {
    const parts = whole.split(/\s+-\s+/);
    if (parts.length < 2) return '';
    parts.shift(); // 作者
    const last = parts[parts.length - 1].trim();
    if (parts.length > 1 && /^(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?:\/\S*)?$/.test(last)) parts.pop();
    return parts.join(' - ').trim();
  }

  function detectFromGsA(whole) {
    const res = classify(whole);
    return res.state === 'hit' ? res.entry : null;
  }

  // 三种状态：
  //   hit     —— 命中 CCF 目录（附带 entry）
  //   none    —— 有会议/期刊字段，但不在目录里（等级 N/A）
  //   unknown —— 谷歌学术没给会议/期刊信息，无法判断
  function classify(whole) {
    if (!whole) return { state: 'unknown', venue: '' };
    const w = String(whole).replace(/\s+/g, ' ').trim();
    const venue = venuePart(w);
    if (!venue) {
      if (/\b(arxiv|biorxiv|medrxiv|ssrn|preprint|researchgate)\b/i.test(w)) return { state: 'none', venue: '' };
      return { state: 'unknown', venue: '' };
    }
    return classifyVenue(venue);
  }

  // 单独给一段“会议/期刊名”定级（「引用」接口拿到的名字也走这里）
  function isTruncated(v) { return /[…]|\.\.\./.test(v); }

  const NOISE_TOKENS = { vol: 1, volume: 1, no: 1, issue: 1, pp: 1, p: 1, part: 1, special: 1, section: 1 };

  // 整段名字是否就是 head，后面只跟卷期页之类的噪声词
  function probeIs(tokens, head) {
    if (tokens.length < head.length) return false;
    for (let i = 0; i < head.length; i++) if (tokens[i] !== head[i]) return false;
    for (let i = head.length; i < tokens.length; i++) if (!NOISE_TOKENS[tokens[i]]) return false;
    return true;
  }

  function classifyVenue(venue) {
    const v = String(venue || '').replace(/\s+/g, ' ').trim();
    if (!v) return { state: 'unknown', venue: '' };
    // 只有年份/标点（如 "2020"）→ 视为没有会议期刊信息
    if (!/[A-Za-z]{2}/.test(v)) return { state: 'unknown', venue: v };
    // 全称匹配前去掉 "(TOCS)" "(USENIX ATC 21)" 这类尾注
    const bare = v.replace(/\([^()]{1,24}\)/g, ' ');
    const probe = bare.toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim();

    // 名称全由虚词组成的两本 A 类刊物（归一化后几乎不剩 token）。
    // 只允许“卷/期/页”这类噪声词跟在后面，否则 “Proceedings of the 2020 IEEE …” 会被误吞。
    const pt = probe.split(' ');
    if (probeIs(pt, ['proceedings', 'of', 'the', 'ieee'])) {
      const e = byAbbr.get('Proc.IEEE');
      if (e) return { state: 'hit', entry: e, venue: v };
    }
    if (probeIs(pt, ['journal', 'of', 'the', 'acm'])) {
      const e = byAbbr.get('JACM');
      if (e) return { state: 'hit', entry: e, venue: v };
    }

    const toks = tokensOf(bare, false);
    const hit = matchFull(toks) || matchAbbr(v);
    if (hit) return { state: 'hit', entry: hit, venue: v };

    // 整段名字恰好是目录里的通用单词（Networks、Cognition）→ 只是“存疑”
    const generic = toks.length ? genericMap.get(toks.join('|')) : null;
    if (generic) return { state: 'ambiguous', entry: generic, venue: v };

    // 名字被谷歌截断 → 信息不全，不能断言“未收录”
    if (isTruncated(v)) return { state: 'unresolved', venue: v };

    return { state: 'none', venue: v };
  }

  // ==== RUNTIME ====

  const BADGE_CLASS = 'ccf-badge';
  const CSS = [
    '.ccf-badge{display:inline-block;margin:0 0 0 8px;padding:0 6px;border:1px solid;border-radius:4px;',
    'font:700 11px/17px Arial,Helvetica,"PingFang SC","Microsoft YaHei",sans-serif;letter-spacing:.2px;',
    'vertical-align:middle;white-space:nowrap;cursor:help;user-select:none;text-decoration:none}',
    '.ccf-badge.ccf-rank-a{color:#fff;background:#c5221f;border-color:#c5221f}',
    '.ccf-badge.ccf-rank-b{color:#3a2200;background:#f9ab00;border-color:#e09400}',
    '.ccf-badge.ccf-rank-c{color:#fff;background:#1967d2;border-color:#1967d2}',
    '.ccf-badge.ccf-na{color:#5f6368;background:#f1f3f4;border-color:#9aa0a6;font-weight:600}',
    '.ccf-badge.ccf-unresolved{color:#5f6368;background:transparent;border-color:#b0b6bb;border-style:dashed;font-weight:600}',
    '.ccf-badge.ccf-ambiguous{color:#5f6368;background:transparent;border-color:#b0b6bb;border-width:3px;border-style:double;font-weight:600}',
    '.ccf-badge.ccf-unknown{color:#74797e;background:transparent;border-color:#dadce0;border-style:dotted;font-weight:600}',
    '.ccf-badge.ccf-pending{color:#74797e;background:transparent;border-color:#dadce0;border-style:dotted;font-weight:500}',
    '.ccf-badge:hover{filter:brightness(.95)}'
  ].join('');

  function ensureStyle() {
    if (document.getElementById('ccf-scholar-style')) return;
    const st = document.createElement('style');
    st.id = 'ccf-scholar-style';
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  let mode = 'full';
  let showNA = true;
  let useCite = true;
  try {
    if (typeof GM_getValue === 'function') {
      mode = GM_getValue('ccf_mode', 'full') || 'full';
      showNA = GM_getValue('ccf_show_na', true) !== false;
      useCite = GM_getValue('ccf_use_cite', true) !== false;
    } else {
      mode = localStorage.getItem('ccf_mode') || 'full';
      showNA = localStorage.getItem('ccf_show_na') !== '0';
      useCite = localStorage.getItem('ccf_use_cite') !== '0';
    }
  } catch (e) { /* ignore */ }

  function saveMode(v) {
    mode = v;
    try {
      if (typeof GM_setValue === 'function') GM_setValue('ccf_mode', v);
      else localStorage.setItem('ccf_mode', v);
    } catch (e) { /* ignore */ }
  }

  function saveShowNA(v) {
    showNA = v;
    try {
      if (typeof GM_setValue === 'function') GM_setValue('ccf_show_na', v);
      else localStorage.setItem('ccf_show_na', v ? '1' : '0');
    } catch (e) { /* ignore */ }
  }

  function saveUseCite(v) {
    useCite = v;
    try {
      if (typeof GM_setValue === 'function') GM_setValue('ccf_use_cite', v);
      else localStorage.setItem('ccf_use_cite', v ? '1' : '0');
    } catch (e) { /* ignore */ }
  }

  function makeBadge(res) {
    const s = document.createElement('span');
    if (res.state === 'hit') {
      const hit = res.entry;
      s.className = BADGE_CLASS + ' ccf-rank-' + hit.rank.toLowerCase() + ' ccf-type-' + hit.type;
      s.textContent = mode === 'compact'
        ? 'CCF-' + hit.rank
        : TYPE_NAME[hit.type] + ' · CCF-' + hit.rank;
      s.title = hit.full + '\n' +
        hit.cat + ' · CCF ' + hit.rank + ' 类' + TYPE_NAME[hit.type] +
        (cleanAbbr(hit.abbr) ? '（' + cleanAbbr(hit.abbr) + '）' : '') + '\nCCF 推荐目录（第七版）';
    } else if (res.state === 'none') {
      s.className = BADGE_CLASS + ' ccf-na';
      s.textContent = mode === 'compact' ? 'N/A' : 'CCF: 未收录';
      s.title = (res.venue ? '会议/期刊：' + res.venue + '\n' : '') +
        (res.via === 'cite' ? '（名称来自谷歌学术「引用」信息）\n' : '') +
        '不在 CCF 推荐目录（第七版）中，等级 N/A';
    } else if (res.state === 'unresolved') {
      s.className = BADGE_CLASS + ' ccf-unresolved';
      s.textContent = mode === 'compact' ? '?' : 'CCF: 待确认';
      s.title = '会议/期刊名被截断或缺失，且「引用」补全未成功，无法判定等级' +
        (res.venue ? '\n原始：' + res.venue : '');
    } else if (res.state === 'ambiguous') {
      const e = res.entry;
      s.className = BADGE_CLASS + ' ccf-ambiguous';
      s.textContent = mode === 'compact' ? '?' : 'CCF: 存疑';
      s.title = '疑似：' + e.full + '\n' +
        e.cat + ' · CCF ' + e.rank + ' 类' + TYPE_NAME[e.type] +
        (cleanAbbr(e.abbr) ? '（' + cleanAbbr(e.abbr) + '）' : '') + '\n' +
        '该名称过于通用，无法确认就是这本刊物，故不直接给出等级';
    } else if (res.state === 'pending') {
      s.className = BADGE_CLASS + ' ccf-pending';
      s.textContent = mode === 'compact' ? '…' : 'CCF: 查询中…';
      s.title = '会议/期刊名被谷歌学术截断，正在通过「引用」信息补全…';
    } else {
      s.className = BADGE_CLASS + ' ccf-unknown';
      s.textContent = mode === 'compact' ? '?' : 'CCF: 未知';
      s.title = '谷歌学术未提供会议/期刊信息，无法判断 CCF 等级';
    }
    s.addEventListener('click', function (ev) { ev.stopPropagation(); }, true);
    return s;
  }

  // 结果缓存：同一段 .gs_a 文本只匹配一次（MutationObserver 会反复触发扫描）
  const detCache = new Map();
  function detectCached(ga) {
    const key = ga.textContent.replace(/\s+/g, ' ').trim().slice(0, 400);
    if (detCache.has(key)) return detCache.get(key);
    const res = classify(key);
    if (detCache.size > 3000) detCache.clear();
    detCache.set(key, res);
    return res;
  }

  /* ---------- 用「引用」信息补全被截断的会议/期刊名 ---------- */

  const citeCache = new Map();  // clusterId -> 会议/期刊名（'' 表示取不到）
  const triedCids = new Set();
  const jobQueue = [];
  const MAX_LOOKUPS = 20;       // 单页最多查 20 条，避免触发谷歌的验证码
  let lookups = 0;
  let pumpTimer = null;

  function clusterId(ri) {
    const holder = ri.closest ? ri.closest('[data-cid]') : null;
    if (holder) {
      const v = holder.getAttribute('data-cid');
      if (v) return v;
    }
    const cit = ri.querySelector('.gs_or_cit');
    if (cit) {
      const v = cit.getAttribute('data-cid');
      if (v) return v;
      const m = (cit.getAttribute('onclick') || '').match(/gs_ocit\(\s*event\s*,\s*'?(\d+)'?/);
      if (m) return m[1];
    }
    return null;
  }

  function citeUrl(cid, scirp) {
    const hl = (location.search.match(/[?&]hl=([^&]*)/) || [])[1] || 'zh-CN';
    return '/scholar?q=info:' + encodeURIComponent(cid) + ':scholar.google.com/&output=cite&scirp=' +
      (scirp || 0) + '&hl=' + encodeURIComponent(hl);
  }

  function resultIndex(ri) {
    const all = document.querySelectorAll('.gs_ri');
    for (let i = 0; i < all.length; i++) if (all[i] === ri) return i;
    return 0;
  }

  function cleanText(html) {
    return String(html)
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
      .replace(/\s+/g, ' ').trim();
  }

  // 引用页里优先取 BibTeX 的 journal/booktitle，其次取 MLA 格式里 <i>会议/期刊名</i>
  function parseCiteVenues(html) {
    const out = [];
    if (!html) return out;
    const all = html.match(/(?:journal|booktitle)\s*=\s*\{([^}]{2,300})\}/gi) || [];
    all.forEach(function (m) {
      const v = m.replace(/^[^=]*=\s*\{/, '').replace(/\}$/, '');
      out.push(cleanText(v));
    });
    const re = /<i>([\s\S]{2,300}?)<\/i>/gi;
    let m;
    while ((m = re.exec(html)) !== null) out.push(cleanText(m[1]));
    return out.filter(function (s) { return s && s.length > 2; });
  }

  function fetchText(url) {
    if (typeof fetch !== 'function') return Promise.resolve({ ok: false, text: '' });
    return fetch(url, { credentials: 'include' })
      .then(function (r) {
        if (!r.ok) return { ok: false, text: '' };
        return r.text().then(function (t) { return { ok: true, text: t }; });
      })
      .catch(function () { return { ok: false, text: '' }; });
  }

  function pickVenue(cands) {
    if (!cands || !cands.length) return '';
    for (let i = 0; i < cands.length; i++) {
      if (classifyVenue(cands[i]).state === 'hit') return cands[i];
    }
    return cands[0];
  }

  function resolveViaCite(cid, scirp) {
    return fetchText(citeUrl(cid, scirp)).then(function (r) {
      if (!r.ok) { // 被限流/验证码拦了就别再补刀
        console.debug('[CCF] 引用接口未返回 200，跳过补全：', citeUrl(cid, scirp));
        return '';
      }
      const cands = parseCiteVenues(r.text);
      if (cands.length) return pickVenue(cands);
      // 引用页正常但解析不出名字 → 退一步取 BibTeX（优先用页面里给出的真实链接）
      console.debug('[CCF] 引用页解析不出会议名，改用 BibTeX 导出');
      const href = r.text.match(/href="([^"]*scholar\.bib\?[^"]+)"/);
      const hl = (location.search.match(/[?&]hl=([^&]*)/) || [])[1] || 'zh-CN';
      const bibUrl = href
        ? href[1].replace(/&amp;/g, '&')
        : '/scholar.bib?q=info:' + encodeURIComponent(cid) +
          ':scholar.google.com/&output=citation&scirp=' + (scirp || 0) +
          '&hl=' + encodeURIComponent(hl) + '&ct=citation&cd=0';
      return fetchText(bibUrl).then(function (b) {
        return b.ok ? pickVenue(parseCiteVenues(b.text)) : '';
      });
    }).catch(function () { return ''; });
  }

  // 只有“名字被截断”或“根本没有会议/期刊字段”才值得发请求
  function needsCiteLookup(res) {
    return res.state === 'unknown' || res.state === 'unresolved';
  }

  function setBadge(ri, res) {
    const rt = ri.querySelector('.gs_rt');
    if (!rt) return;
    rt.querySelectorAll('.' + BADGE_CLASS).forEach(function (b) { b.remove(); });
    rt.appendChild(makeBadge(res));
  }

  function toResult(venue) {
    const c = classifyVenue(venue);
    if (c.state === 'hit') return c;
    c.via = 'cite';
    return c;
  }

  function enqueue(job) { jobQueue.push(job); pump(); }

  function pump() {
    if (pumpTimer || !jobQueue.length) return;
    pumpTimer = setTimeout(function () {
      pumpTimer = null;
      const job = jobQueue.shift();
      if (!job) return;
      lookups++;
      resolveViaCite(job.cid, job.scirp).then(function (venue) {
        citeCache.set(job.cid, venue || '');
        if (!venue) { if (job.ri.isConnected) setBadge(job.ri, job.res); return; }
        if (job.ri.isConnected) setBadge(job.ri, toResult(venue));
      }).catch(function () {
        if (job.ri.isConnected) setBadge(job.ri, job.res);
      }).then(function () { pump(); });
    }, 800);
  }

  function scan() {
    ensureStyle();
    const ris = document.querySelectorAll('.gs_ri');
    for (let i = 0; i < ris.length; i++) {
      const ri = ris[i];
      const rt = ri.querySelector('.gs_rt');
      const ga = ri.querySelector('.gs_a');
      if (!rt || !ga) continue;
      if (ri.querySelector('.' + BADGE_CLASS)) continue; // 已标注（或页面重渲染过）

      const res = detectCached(ga);
      const cid = clusterId(ri);

      // 之前用「引用」查到过就复用
      let out = res;
      if (res.state !== 'hit' && cid && citeCache.has(cid) && citeCache.get(cid)) {
        out = toResult(citeCache.get(cid));
      }
      if (out.state !== 'hit' && !showNA) continue;

      // 截断 / 缺失的会议期刊名，交给「引用」补全
      const needLookup = out.state !== 'hit' && useCite && cid && needsCiteLookup(out) &&
        !citeCache.has(cid) && !triedCids.has(cid) && lookups + jobQueue.length < MAX_LOOKUPS;
      if (needLookup) {
        triedCids.add(cid);
        rt.appendChild(makeBadge({ state: 'pending' }));
        enqueue({ ri: ri, cid: cid, res: out, scirp: resultIndex(ri) });
        continue;
      }
      rt.appendChild(makeBadge(out));
    }
  }

  let timer = null;
  function schedule() {
    if (timer) return;
    timer = setTimeout(function () { timer = null; scan(); }, 150);
  }

  function isOwnNode(n) {
    return n && n.nodeType === 1 && n.classList && n.classList.contains(BADGE_CLASS);
  }

  const mo = new MutationObserver(function (muts) {
    for (let i = 0; i < muts.length; i++) {
      const added = muts[i].addedNodes;
      for (let j = 0; j < added.length; j++) {
        if (!isOwnNode(added[j])) { schedule(); return; }
      }
    }
  });

  function resetAndScan() {
    detCache.clear();
    document.querySelectorAll('.' + BADGE_CLASS).forEach(function (b) { b.remove(); });
    scan();
  }

  function boot() {
    scan();
    if (document.body) mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('popstate', schedule);
  }

  if (typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('切换样式：详细（期刊/会议+等级）/ 紧凑（仅等级）', function () {
      saveMode(mode === 'full' ? 'compact' : 'full');
      resetAndScan();
    });
    GM_registerMenuCommand('重新扫描当前页面', resetAndScan);
    GM_registerMenuCommand((showNA ? '✅ ' : '⬜ ') + '标记非 A/B/C 的条目（未收录 / 待确认 / 存疑 / 未知）', function () {
      saveShowNA(!showNA);
      resetAndScan();
    });
    GM_registerMenuCommand((useCite ? '✅ ' : '⬜ ') + '用「引用」补全被截断的会议/期刊名', function () {
      saveUseCite(!useCite);
      if (!useCite) jobQueue.length = 0;
      resetAndScan();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
