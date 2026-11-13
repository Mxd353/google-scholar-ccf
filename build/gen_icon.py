import os
from PIL import Image, ImageDraw, ImageFont

S = 512  # 4x 超采样，最后缩小抗锯齿
CJK = '/home/mxd/.fonts/NotoSansSC-Regular.ttf'

def rr(d, box, r, fill):
    d.rounded_rectangle(box, radius=r, fill=fill)

def make(size):
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # 底板：深灰圆角方块（Tampermonkey 面板是浅色，深底更醒目）
    rr(d, (0, 0, S - 1, S - 1), int(S * 0.22), (32, 33, 36, 255))
    # 三条等级色带（与徽章配色一致：A 红 / B 琥珀 / C 蓝）
    colors = [(197, 34, 31), (249, 171, 0), (25, 103, 210)]
    bw, bh = int(S * 0.62), int(S * 0.085)
    x0 = (S - bw) // 2
    for i, c in enumerate(colors):
        y = int(S * 0.20) + i * int(S * 0.125)
        rr(d, (x0, y, x0 + bw, y + bh), bh // 2, c + (255,))
    # 文字 CCF
    f = ImageFont.truetype(CJK, int(S * 0.235))
    text = 'CCF'
    tb = d.textbbox((0, 0), text, font=f)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    d.text(((S - tw) / 2 - tb[0], int(S * 0.66) - tb[1] + (int(S * 0.30) - th) / 2),
           text, font=f, fill=(255, 255, 255, 255))
    return img.resize((size, size), Image.LANCZOS)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for s in (128, 64, 32):
    make(s).save(os.path.join(ROOT, f'icon-{s}.png'))
print('ok')
