import glob
import re
import os

print("=== VERIFYING SITE INTEGRITY ===")
total_imgs = 0
total_links = 0
errors = 0

for f in sorted(glob.glob('*.html')):
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    # 1. Images
    imgs = re.findall(r'(?:src|data-img|data-bg)=["\']([^"\']+\.(?:jpg|jpeg|png|webp|svg))["\']', content, re.IGNORECASE)
    missing_imgs = []
    for img in set(imgs):
        if not img.startswith('http'):
            clean_path = img.split('?')[0].split('#')[0]
            if not os.path.exists(clean_path):
                missing_imgs.append(clean_path)
    total_imgs += len(imgs)
    
    # 2. Links
    links = re.findall(r'href=["\']([a-zA-Z0-9_-]+\.html(?:#[a-zA-Z0-9_-]+)?)["\']', content)
    missing_links = []
    for l in set(links):
        page = l.split('#')[0]
        if not os.path.exists(page):
            missing_links.append(page)
    total_links += len(links)

    print(f"[{f}]")
    print(f"  Images: {len(imgs)} checked, {len(missing_imgs)} missing")
    if missing_imgs:
        print(f"    Missing: {missing_imgs}")
        errors += len(missing_imgs)
    print(f"  Links:  {len(links)} checked, {len(missing_links)} missing")
    if missing_links:
        print(f"    Missing: {missing_links}")
        errors += len(missing_links)

print(f"\nTotal: {total_imgs} images, {total_links} links checked across all pages. Errors: {errors}")

