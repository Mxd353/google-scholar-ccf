#!/usr/bin/env python3
"""把 CCF 目录 Markdown 编译进油猴脚本。

用法：python3 build/build.py [ccf-catalog-v7.md]
"""
import re, json, os, sys, base64

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

MD = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/.config/opencode/ccf-catalog-v7.md')
TPL = os.path.join(HERE, 'ccf_template.js')
OUT = os.path.join(ROOT, 'ccf-rank-google-scholar.user.js')
ICON128 = os.path.join(ROOT, 'icon-128.png')
ICON64 = os.path.join(ROOT, 'icon-64.png')

def icon_uri(path):
    if not os.path.exists(path):
        return ''
    return 'data:image/png;base64,' + base64.b64encode(open(path, 'rb').read()).decode()

ICON_LINES = ''
if os.path.exists(ICON128):
    ICON_LINES += '// @icon         ' + icon_uri(ICON128) + '\n'
if os.path.exists(ICON64):
    ICON_LINES += '// @icon64       ' + icon_uri(ICON64) + '\n'

src = open(MD, encoding='utf-8').read().splitlines()
cat = typ = rank = None
records = []
for line in src:
    line = line.rstrip()
    if line.startswith('## '):
        cat = line[3:].strip()
    elif line.startswith('### '):
        m = re.match(r'###\s*(期刊|会议)\s*·\s*([ABC])\s*类', line)
        if m:
            typ = 'j' if m.group(1) == '期刊' else 'c'
            rank = m.group(2)
    elif line.startswith('|') and typ:
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        if len(cells) < 4 or cells[0] == '序号' or set(cells[0]) <= set('- '):
            continue
        abbr, full = cells[1], cells[2]
        if not full:
            continue
        records.append([abbr, full, typ, rank, cat or ''])

assert len(records) > 600, len(records)

# 去重（同名同类型同等级）
seen = set()
data = []
for r in records:
    k = tuple(r)
    if k in seen:
        continue
    seen.add(k)
    data.append(r)

js = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
tpl = open(TPL, encoding='utf-8').read()
out = tpl.replace('/*__CCF_DATA__*/[]', js)
assert len(out) > len(tpl)

header = '''// ==UserScript==
// @name         Google Scholar CCF 等级
// @namespace    https://github.com/mxd/ccf-scholar
// @version      1.3.0
// @description  在 Google Scholar 搜索结果标题旁显示 CCF（第七版，2026）推荐等级，区分期刊/会议，未收录的标注 N/A，截断的会议名用「引用」信息补全
// @author       mxd
''' + ICON_LINES + '''// @match        https://scholar.google.com/*
// @match        https://scholar.google.com.hk/*
// @include      *://scholar.google.*/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @noframes
// ==/UserScript==

'''
out = header + out

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(out)
print('write', OUT, len(out), 'bytes,', len(data), 'entries')
