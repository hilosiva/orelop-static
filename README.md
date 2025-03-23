# Orelop Static

![screenshot](https://github.com/hilosiva/orelop-static/blob/main/public/ogp.png)

## 概要

Orelop Static は、俺流の静的サイト開発環境です。
フロントエンドツールには「[vite](https://ja.vitejs.dev/)
」を利用しているため、高速に静的サイトを開発することが可能です。

- HTML + CSS（Scss/Sass） + JavaScript（TypeScript）による開発が可能
- CSSファイルにおいてもファイル分割やスタイルのネスト（入れ子）が可能
- CSSファイル内でカスタムメディアクエリや、`fluid()`が利用可能
- 画像やCSSファイル、JavaScriptファイルはビルド時にハッシュ値をファイル名に付与
- 画像はビルド時に圧縮し、WebP、AVIFファイルを生成（htaccessで最適な画像をリスポンス）


## 準備

Orelop Static を利用するには、あらかじめ以下のツールをマシンにインストールしておいて下さい。

- [Node.js](https://nodejs.org/ja) >= 20


## インストール

1. ターミナルを開き、「Orelop Static」を初期化したいディレクトリに移動します。

```bash
cd /path/to/project-directory
```

2. 以下のコマンドを実行して、「Orelop Static」をインストールします。


■ npm
```bash
npm create orelop@latest --template=static
```

■ yarn
```bash
yarn create orelop@latest --template=static
```

■ pnpm
```bash
pnpm create orelop@latest --template=static
```

プロジェクト名を聞かれるのでプロジェクト名を入力してエンターしてください。

続いて、利用するCSSのプリプロセッサーやフレームワーク（SassやTailwindCSS）や、
JavaScriptのライブラリ（GSAPやLenis、Rola）などを任意で選択してください。


## 開発用サーバーの起動

以下のコマンドで開発用サーバーを起動できます。

■ npm
```
npm run dev
```

■ yarn
```
yarn dev
```

■ pnpm
```
pnpm dev
```

## HTML の開発

HTML ファイルは「src」ディレクトリに配置して下さい。

### Public ディレクトリ内のアセット

「Public」ディレクトリ内に保存したファイルは、ビルド後に納品用テーマディレクトリとして「dist」ディレクトリにコピーされます。

## CSS/Sass の開発

「Orelop Static」は、CSS、Sass のどちらの開発にも対応しています。

CSS で開発するには「src/assets/styles/」ディレクトリ内にある「global.css」を利用し、
Sass で開発する場合は、「global.css」を「global.scss」に変更してください。

（HTMLファイルの `<link>` 要素の `href`属性も `scss` に変更してください。）


### ベースCSS
「global.css」にはデフォルトで以下の記述により俺流のベーススタイルのCSSを読みこんでいます。

```css
@import "vaultcss";
```

これにより、俺流のリセットや便利なカスタムプロパティなどが利用できます。

不必要な場合は削除してください。
また、resetのみ利用したい場合には、以下のように resetスタイルのみ読み込むことも可能です。

```css
@import "vaultcss/reset";
```


### ネスティングルール
「Orelop Static」は、「[CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/)」に対応しているため、スタイルルールのネスト（入れ子）が利用できます。

例

```css
.hero__figure {
  height: 100vh;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
```

### カスタムメディアクエリ
カスタムメディアクエリを使うことも可能です。

デフォルトでは、以下のカスタムメディアクエリが自動で登録されます。


```css
@custom-media --xxs (width >= 23.4375rem); /* 375px */
@custom-media --xs (width >= 25rem); /* 400px */
@custom-media --sm (width >= 36rem); /* 576px */
@custom-media --md (width >= 48rem); /* 768px */
@custom-media --lg (width >= 64rem); /* 1024px */
@custom-media --xl (width >= 80rem); /* 1280px */
@custom-media --xxl (width >= 96rem); /* 1536px */
```


従って、以下のように少ない記述量でレスポンシブ対応が可能です。


```css
.section {
  display: block grid;
  grid-template-columns: repeat(var(--cols, 1), minmax(0, 1fr));

  @media (--md) {
    --cols: 2;
  }

  @media (--lg) {
    --cols: 3;
  }
}
```


### @import

`@import` による、CSS ファイルの分割にも対応しています。

例：「base」ディレクトリ内の「reset.css」と「components」ディレクトリ内の「hero.css」の読み込み

```css
@layer settings, base, general, vendors, components;

@import "base/reset.css" layer(base);
@import "components/hero.css" layer(components);
```



SASSの場合は、glob パターンによる読み込みにも対応しています。

例：「fondation」ディレクトリと「layout」ディレクトリ内にあるすべての.scss ファイルの読み込み

```scss
@use "foundation/**/*.scss";
@use "layout/**/*.scss";
```

### オリジナル関数
CSSファイル内では、下記のオリジナル関数が利用可能です。

- `fluid()` : 最小値、最大値から `clamp()` を生成

```css
p {
  /*
    fluid(最小値, 最大値, [最小ビューポート(px)], [最大ビューポート(px)])
    最小ビューポートの初期値： 320
    最大ビューポートの初期値： 1920
  */
  font-size: fluid(16px 24px); /* clamp(1rem, 0.8786407766990291rem + 0.517799352750809vw, 1.5rem) */
}
```

最小値と最大値には `px` または `rem` が使えます。


最小ビューポートや、 最大ビューポートの初期値を変更する場合は、`vite.config.ts` で、`vaultcss(),` のオプションを指定します。

詳細は、[lightningcss-plugin-fluid](https://github.com/hilosiva/lightningcss-plugin-fluid) をご確認ください。

```ts
export default defineConfig({
  ...
  plugins: [
    ...
    vaultcss({
      fluid: {
        minViewPort: 375, // 最小ビューポートの初期値を 375 に変更
        maxViewPort: 1440, // 最大ビューポートの初期値を 1440 に変更
        baseFontSize: 16, // ベースのフォントサイズ（規定値: 16）
        unit: "cqi" // 推奨値に使う単位（規定値: "vw"）
      }
    }),
  ],
  ...
})
```





## JavaScript の開発

JavaScript の開発は「src/assets/scripts/」ディレクトリ内の「main.ts」を利用して下さい。
JavaScriptを利用する場合は拡張子を `.js` に変更してください。

（HTMLファイルの `<script>` 要素の `src`属性も `js` に変更してください。）



## 納品データの準備

以下のコマンドを実行すると、「dist」ディレクトリが作成され、納品用のテーマファイルが生成されます。

■ npm

```
npm run build
```

■ yarn
```
yarn build
```

ビルドを行うと、「src/assets/images/」ディレクトリ内の画像ファイルを最適化（圧縮や、webp ファイルなどの生成）を行い、ハッシュ値をつけて「dist/assets/images/」内に配置されます。

画像の圧縮率や、生成するフォーマットなどに関しては、[@hilosiva/vite-plugin-image-optimizer](https://github.com/hilosiva/vite-plugins/tree/main/packages/vite-plugin-image-optimizer)を利用しているため、[@hilosiva/vite-plugin-image-optimizer](https://github.com/hilosiva/vite-plugins/tree/main/packages/vite-plugin-image-optimizer)のオプションで設定して下さい。


「.htaccess」を使用しており、webp が利用できるブラウザで閲覧した場合、「.jpg」や「.png」ファイルは、webp ファイルがレスポンスされます。

.scss ファイルや.css ファイルは、「dist/assets/styles/」内に「index-[ハッシュ値].css」というファイル名で配置されます。

.js ファイルは「dist/assets/scripts/」内に「main-[ハッシュ値].js」というファイル名で配置されます。

## 納品データのプレビュー

以下のコマンドを実行すると、「dist」ディレクトリをテーマフォルダとして、サーバーが立ち上がります。

■ npm

```
npm run preview
```

■ yarn

```
yarn preview
```


■ pnpm

```
pnpm preview
```
