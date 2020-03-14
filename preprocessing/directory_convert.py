import glob
import os
import sys
from ctr_convert import ctr2bin

if __name__ == "__main__":
    input_dir = sys.argv[1]
    output_dir = sys.argv[2]

    planets = glob.glob(os.path.join(input_dir, "*.ctr"))
    for i, planet in enumerate(planets):
        base_name = os.path.splitext(os.path.basename(planet))[0]
        output_planet = os.path.join(output_dir, base_name + ".bin")
        ctr2bin(planet, output_planet)
        print(f"{i + 1}/{len(planets)}", base_name)

