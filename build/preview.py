#!/usr/bin/env python3
"""生成 README 用的徽章效果预览图（按脚本里同样的配色/边框样式 2x 绘制，非真实截图）。"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CJK = '/home/mxd/.fonts/NotoSansSC-Regular.ttf'

f_badge = ImageFont.truetype(CJK, 22)
f_title = ImageFont.truetype(CJK, 28)
f_auth = ImageFont.truetype(CJK, 22)

# 行: 标题, 作者行, 徽章文字, 底色, 文字色, 边框样式
ROWS = [
    ('In Search of an Understandable Consensus Algorithm', 'D Ongaro, J Ousterhout - USENIX ATC, 2014 - usenix.org',
     '会议 · CCF-A', '#c5221f', '#ffffff', 'none'),
    ('Path ORAM: an extremely simple oblivious RAM protocol', 'E Stefanov - ACM Internet Measurement Conference, 2013 - dl.acm.org',
     '会议 · CCF-B', '#f9ab00', '#3a2200', 'none'),
    ('A survey on wireless sensor networks', 'X Yang - Computer Communications, 2021 - sciencedirect.com',
     '期刊 · CCF-C', '#1967d2', '#ffffff', 'none'),
    ('Some paper about wireless sensor networks', 'X Yang, Y Shen - Sensors, 2021 - mdpi.com',
     'CCF: 未收录', '#f1f3f4', '#5f6368', 'solid'),
    ('A paper with a truncated venue', 'A Author - … - IEEE Transactions on …, 2020 - ieeexplore.ieee.org',
     'CCF: 待确认', None, '#5f6368', 'dashed'),
    ('A paper published in Networks', 'P Author - Networks, 2020 - onlinelibrary.wiley.com',
     'CCF: 存疑', None, '#5f6368', 'double'),
    ('Another paper', 'L Wang - 2020 - ieeexplore.ieee.org',
     'CCF: 未知', None, '#74797e', 'dotted'),
]


def dashed(d, box, color, dash=7, gap=6, width=2):
    x0, y0, x1, y1 = [int(v) for v in box]
    for x in range(x0 + 6, x1 - 6, dash + gap):
        xe = min(x + dash, x1 - 6)
        d.line([(x, y0), (xe, y0)], fill=color, width=width)
        d.line([(x, y1), (xe, y1)], fill=color, width=width)
    for y in range(y0 + 6, y1 - 6, dash + gap):
        ye = min(y + dash, y1 - 6)
        d.line([(x0, y), (x0, ye)], fill=color, width=width)
        d.line([(x1, y), (x1, ye)], fill=color, width=width)
    r = 8
    d.arc([x0, y0, x0 + 2 * r, y0 + 2 * r], 180, 270, fill=color, width=width)
    d.arc([x1 - 2 * r, y0, x1, y0 + 2 * r], 270, 360, fill=color, width=width)
    d.arc([x0, y1 - 2 * r, x0 + 2 * r, y1], 90, 180, fill=color, width=width)
    d.arc([x1 - 2 * r, y1 - 2 * r, x1, y1], 0, 90, fill=color, width=width)


def dotted(d, box, color, step=6, width=2):
    x0, y0, x1, y1 = [int(v) for v in box]
    for x in range(x0 + 6, x1 - 6, step):
        d.line([(x, y0), (x, y0)], fill=color, width=width)
        d.line([(x, y1), (x, y1)], fill=color, width=width)
    for y in range(y0 + 6, y1 - 6, step):
        d.line([(x0, y), (x0, y)], fill=color, width=width)
        d.line([(x1, y), (x1, y)], fill=color, width=width)


def border(d, box, style, color):
    if style == 'solid':
        d.rounded_rectangle(box, radius=6, outline=color, width=2)
    elif style == 'dashed':
        dashed(d, box, color)
    elif style == 'double':
        d.rounded_rectangle(box, radius=6, outline=color, width=2)
        x0, y0, x1, y1 = box
        d.rounded_rectangle([x0 + 4, y0 + 4, x1 - 4, y1 - 4], radius=3, outline=color, width=2)
    elif style == 'dotted':
        dotted(d, box, color)


def main():
    W = 1560
    H = 40 + len(ROWS) * 92
    img = Image.new('RGB', (W, H), '#ffffff')
    d = ImageDraw.Draw(img)
    y = 20
    for title, auth, badge, bg, fg, style in ROWS:
        d.text((40, y), title, font=f_title, fill='#1a0dab')
        d.text((40, y + 38), auth, font=f_auth, fill='#006621')
        tb = d.textbbox((0, 0), badge, font=f_badge)
        th = tb[3] - tb[1]
        bw, bh = tb[2] - tb[0] + 26, th + 16
        bx = 40 + d.textlength(title, font=f_title) + 16
        by = y + 4
        box = [bx, by, bx + bw, by + bh]
        if bg:
            d.rounded_rectangle(box, radius=6, fill=bg)
        if style != 'none':
            border(d, box, style, '#9aa0a6' if style == 'solid' else
                   ('#dadce0' if style == 'dotted' else '#b0b6bb'))
        d.text((bx + 13, by + (bh - th) / 2 - tb[1]), badge, font=f_badge, fill=fg)
        y += 92
    out = os.path.join(ROOT, 'badge-preview.png')
    img.save(out)
    print('write', out, img.size)


if __name__ == '__main__':
    main()
