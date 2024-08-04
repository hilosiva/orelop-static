# Orelop Static（仮）

![screenshot](https://github.com/hilosiva/orelop-static/blob/main/public/ogp.png)

## 概要

Orelop Static は、俺流の静的サイト開発環境です。
フロントエンドツールには「[vite](https://ja.vitejs.dev/)
」を利用しているため、高速に静的サイトを開発することが可能です。

- HTML + CSS（Scss/Sass） + JavaScriptによる開発が可能
- CSSファイルにおいてもファイル分割やスタイルのネスト（入れ子）が可能
- CSSファイル内で`pxtorem()`、`pxtoem()`、`fluid()`が利用可能
- 画像やCSSファイル、JavaScriptファイルはビルド時にハッシュ値をファイル名に付与
- 画像はビルド時に圧縮し、WebP、AVIFファイルを生成（htaccessで最適な画像をリスポンス）


## 準備

Orelop Static を利用するには、あらかじめ以下のツールをマシンにインストールしておいて下さい。

- [Node.js](https://nodejs.org/ja) >=20
- [git](https://git-scm.com/)

## ダウンロード

### zipファイルでダウンロード

1. [zipファイルをダウンロード](https://github.com/hilosiva/orelop-static/archive/refs/heads/main.zip)
2. ダウンロードしたzipファイルを解凍
3. 解凍したディレクトリ名をプロジェクト名に変更

### インストール

1. ターミナルを開き、「Orelop Static」を初期化したいディレクトリに移動します。

```bash
cd /path/to/project-directory
```

2. 以下のコマンドを実行して、「Orelop Static」をインストールします。

```bash
npm create orelop-static@latest
```

※ はプロジェクト名を聞かれるのでプロジェクト名を入力してエンターしてください。

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

## HTML の開発

HTML ファイルは「src」ディレクトリに配置して下さい。

### Public ディレクトリ内のアセット

「Public」ディレクトリ内に保存したファイルは、ビルド後に納品用テーマディレクトリとして「dist」ディレクトリにコピーされます。

## CSS/SCSS の開発

「Orelop Static」は、CSS、SCSS のどちらの開発にも対応しています。

### CSS で開発

CSS で開発するには「src/assets/css/」ディレクトリ内にある「global.css」を利用して下さい。

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

また、`@import` による、CSS ファイルを分割にも対応しています。

例：「base」ディレクトリ内の「oreset.css」と「components」ディレクトリ内の「hero.css」の読み込み

```css
@import "base/oreset.css";
@import "components/hero.css";
```

また、CSSファイル内で下記のオリジナル関数が利用可能です。

- `pxtorem()` : `px` を `rem` に変換
- `pxtoem()` ： `px` を `em` に変換
- `fluid()` : 最小値（px）、最大値（px）から `clamp()` を生成

```css
div {
  margin-block-start: pxtorem(32); /* 2rem */
  padding-block: pxtoem(24) pxtoem(16); /* 1.5em 1em  */
}

p {
  /*
    fluid(最小値（px）, 最大値(px), [最小ビューポート(px)], [最大ビューポート(px)])
    最小ビューポートの初期値： 320
    最大ビューポートの初期値： 1920
  */
  font-size: fluid(16,24); /* clamp(1rem, 0.8786407766990291rem + 0.517799352750809vw, 1.5rem) */
}
```


最小ビューポートや、 最大ビューポートの初期値を変更する場合は、`postcss.config.cjs` で、`postcss-transore` のオプションを指定します。

```js
module.exports = {
  plugins: [
    require("@hilosiva/postcss-transore", {
      minViewPort: 375, // 最小ビューポートの初期値を 375 に変更
      maxViewPort: 1440, // 最大ビューポートの初期値を 1440 に変更
    }),
  ],
};
```



### SCSS で開発

scss を使って CSS を開発する場合は、「src/assets/scss/」ディレクトリ内に scss ファイルを作成して、HTML ファイルに `<link>` 要素で読み込んでください。

```html
<link rel="stylesheet" href="/assets/scss/global.scss" />
```

glob パターンによる読み込みにも対応しています。

例：「fondation」ディレクトリと「layout」ディレクトリ内にあるすべての.scss ファイルの読み込み

```scss
@use "foundation/**/*.scss";
@use "layout/**/*.scss";
```

## JavaScript の開発

JavaScript の開発は「src/assets/js/」ディレクトリ内の「main.js」を利用して下さい。

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

ビルドを行うと、「src/assets/img/」ディレクトリ内の画像ファイルを最適化（圧縮や、webp ファイルなどの生成）を行い、ハッシュ値をつけて「dist/assets/img/」内に配置されます。

画像の圧縮率や、生成するフォーマットなどに関しては、[vite-plugin-image-oretimaizer](https://github.com/hilosiva/vite-plugin-image-oretimaizer)を利用しているため、[vite-plugin-image-oretimaizer](https://github.com/hilosiva/vite-plugin-image-oretimaizer)のオプションで設定して下さい。

「.htaccess」を使用しており、webp が利用できるブラウザで閲覧した場合、「.jpg」や「.png」ファイルは、webp ファイルがレスポンスされます。

.scss ファイルや.css ファイルは、「dist/assets/css/」内に「index-[ハッシュ値].css」というファイル名で配置されます。

.js ファイルは「dist/assets/css/」内に「main-[ハッシュ値].js」というファイル名で配置されます。

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
