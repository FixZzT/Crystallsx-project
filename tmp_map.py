import pathlib, re, unicodedata
root = pathlib.Path('.').resolve()
text = (root / 'src' / 'data.ts').read_text(encoding='utf-8')

# Parse brand blocks containing categories and product names
brand_pattern = re.compile(r"\{\s*name:\s*\"([^\"]+)\".*?subtitle:\s*\"[^\"]+\".*?categories:\s*\[((?:.|\n)*?)\]\s*\}\s*\]", re.S)
cat_pattern = re.compile(r"\{\s*name:\s*\"([^\"]+)\"\s*,\s*products:\s*\[([^\]]*)\]", re.S)

brands = []
for bm in brand_pattern.finditer(text):
    brand = bm.group(1)
    cat_block = bm.group(2)
    cats = []
    for cm in cat_pattern.finditer(cat_block):
        cat = cm.group(1)
        products = re.findall(r'\"([^\"]+)\"', cm.group(2))
        cats.append({'category': cat, 'products': products})
    brands.append({'brand': brand, 'categories': cats})

public = root / 'public'
files = [p for p in public.rglob('*') if p.is_file()]

def norm(s):
    s = unicodedata.normalize('NFKD', s.lower())
    return ''.join(ch for ch in s if ch.isalnum())

misses = []

for b in brands:
    for c in b['categories']:
        for p in c['products']:
            nprod = norm(p)
            found = False
            for f in files:
                if nprod in norm(str(f.relative_to(public))):
                    found = True
                    break
            if not found:
                misses.append((b['brand'], c['category'], p))

print('brands', len(brands))
print('mapped', sum(len(c['products']) for b in brands for c in b['categories']) - len(misses))
print('misses', len(misses))
for m in misses:
    print('MISS', m)
