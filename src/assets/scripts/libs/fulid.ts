import type { Function, LengthValue, TokenOrValue } from "lightningcss";

export interface Config {
  minViewPort: number;
  maxViewPort: number;
  baseFontSize: number;
}

export default (opts: Partial<Config>) => ({
  FunctionExit: {
    fluid(f: Function) {
      const defaultOptions: Config = {
        minViewPort: 375,
        maxViewPort: 1920,
        baseFontSize: 16,
      };

      const options = Object.assign(defaultOptions, opts);

      const getRem = (px: number) => {
        return `${px / options.baseFontSize}rem`;
      };

      const isLengthValue = (val: TokenOrValue): val is { type: "length"; value: LengthValue } => {
        return val.type === "length";
      };

      const values = f.arguments.filter(isLengthValue);

      const minSize =
        values[0]?.value?.unit === "rem" ? values[0].value.value * options.baseFontSize : values[0]?.value.value;
      const maxSize =
        values[1]?.value?.unit === "rem" ? values[1].value.value * options.baseFontSize : values[1]?.value.value;

      const minViewPort = values[2]?.value?.unit === "px" ? values[2].value.value : options.minViewPort;
      const maxViewPort = values[3]?.value?.unit === "px" ? values[3].value.value : options.maxViewPort;

      if (minSize && maxSize) {
        const valiablePart = (maxSize - minSize) / (maxViewPort - minViewPort);
        const constant = maxSize - maxViewPort * valiablePart;

        return {
          raw: `clamp(${getRem(minSize)}, ${getRem(constant)} + ${100 * valiablePart}vi, ${getRem(maxSize)})`,
        };
      }
    },
  },
});
