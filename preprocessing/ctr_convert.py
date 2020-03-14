# Convert a CTR file
import sys
import struct
import math
import re


def ctr2bin(filename, output_filename):
    """Function to convert ds9 .ctr file into binary file"""
    with open(filename, "r") as f:
        contents = f.read()

    matches = re.findall(r"\(((?:\n [0-9\.]+ [0-9\.]+)+)\n\)", contents)
    contours = [
        [xy.strip().split(" ") for xy in match.strip().split("\n") if xy.strip() != ""]
        for match in matches
    ]

    # Get min and max
    results = []

    xMin = None
    xMax = None
    yMin = None
    yMax = None

    for shape in contours:
        result = []
        for xy in shape:
            x = float(xy[1])
            y = float(xy[0])

            # Check bounds
            if xMin is None or x < xMin:
                xMin = x
            if xMax is None or x > xMax:
                xMax = x
            if yMin is None or y < yMin:
                yMin = y
            if yMax is None or y > yMax:
                yMax = y

            result.append(x)
            result.append(y)
        results.append(result)

    with open(output_filename, "wb") as binary_file:
        for result in results:
            normalized = []
            for i, coord in enumerate(result):
                if i % 2 == 0:
                    # x coord
                    normalized.append(
                        math.floor((coord - xMin) / (xMax - xMin) * (256 * 256 - 1))
                    )
                else:
                    # y coord
                    normalized.append(
                        math.floor((coord - yMin) / (yMax - yMin) * (256 * 256 - 1))
                    )

            header = struct.pack("<" + "H", len(result) // 2)
            binary_file.write(header)
            b = struct.pack("<" + "H" * len(normalized), *normalized)
            binary_file.write(b)


if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    ctr2bin(input_file, output_file)
