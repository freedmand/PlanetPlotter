import glob
import os
import sys
import json

if __name__ == "__main__":
    planet_dir = sys.argv[1]

    planets = glob.glob(os.path.join(planet_dir, "*.bin"))
    listing = []
    for i, planet in enumerate(planets):
        base_name = os.path.splitext(os.path.basename(planet))[0]
        listing.append(base_name)
    listing = sorted(listing)

    with open(os.path.join(planet_dir, "listing.json"), "w") as f:
        f.write(json.dumps(listing))
