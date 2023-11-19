# Orelop Static（仮）

![screenshot](https://github.com/hilosiva/orelop-static/blob/main/public/ogp.png)

## 概要

Orelop Static は、俺流の静的サイト開発環境です。
フロントエンドツールには「[vite](https://ja.vitejs.dev/)
」を利用しているため、高速に静的サイトを開発することが可能です。

- HTML + CSS（Scss/Sass） + JavaScriptによる開発が可能
- CSSファイルにおいてもファイル分割やスタイルのネスト（入れ子）が可能
- 画像やCSSファイル、JavaScriptファイルはビルド時にハッシュ値をファイル名に付与
- 画像はビルド時に圧縮し、WebP、AVIFファイルを生成（htaccessで最適な画像をリスポンス）


## 準備

Orelop Static を利用するには、あらかじめ以下のツールをマシンにインストールしておいて下さい。

- [Node.js](https://nodejs.org/ja) >=16.4.0
- [git](https://git-scm.com/)

## ダウンロード

### zipファイルでダウンロード

1. [zipファイルをダウンロード](https://github.com/hilosiva/orelop-static/archive/refs/heads/main.zip)
2. ダウンロードしたzipファイルを解凍
3. 解凍したディレクトリ名をプロジェクト名に変更

### コマンドでダウンロード

1. ターミナルを開き、「Orelop Static」を初期化したいディレクトリに移動します。

```bash
cd /path/to/project-directory
```

2. 以下のコマンドを実行して、「Orelop Static」をダウンロードします。

```bash
npx degit hilosiva/orelop-static#main <project-name>
```

※ 「<project-name>」 はプロジェクト名に変更してください。

## インストール

1. ターミナルを開きプロジェクトディレクトリに移動します。

```bash
cd /path/to/<project-name>
```

2. 必要な依存関係をインストールします。

```bash
npm install
```

> **注意**
>
> Orelop Static は、GitHub Package に公開されているパッケージを利用するため、インストールには、GitHub の「[Personal access tokens (classic)](https://github.com/settings/tokens)」が必要となります。
>
> 以下の手順で「.npmrc」ファイルを作成し、@hilosiva の GitHub Package をインストールできるようにしておいて下さい。
>
> 1. GitHub の「 **read:packages** 」権限を付与した「[Personal access tokens (classic)](https://github.com/settings/tokens)」を取得
> 2. お使いのマシンのホームディレクトリ（他のプロジェクトでも使える）かプロジェクトのルートディレクトリ（このプロジェクトのみ使える）に「.npmrc」ファイルを作成し、以下の内容で保存
>
> ```
> @hilosiva:registry="https://npm.pkg.github.com"
> //npm.pkg.github.com/:_authToken={Personal access tokens}
> ```
>
> ※ {Personal access tokens} は「1」で取得したトークンに置き換える
>
> 例
>
> ```
> @hilosiva:registry="https://npm.pkg.github.com"
> //npm.pkg.github.com/:_authToken=ghp_XXXXXXXXXXXXXXXXXXXXX
> ```

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

CSS で開発するには「src/assets/css/」ディレクトリ内にある「style.css」を利用して下さい。

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

例：「foundation」ディレクトリ内のと「oreset.css」と「object」ディレクトリ内の「hero.css」の読み込み

```css
@import "foundation/oreset.css";
@import "object/hero.css";
```

### SCSS で開発

scss を使って CSS を開発する場合は、「src/assets/scss/」ディレクトリ内に scss ファイルを作成して、HTML ファイルに `<link>` 要素で読み込んでください。

```html
<link rel="stylesheet" href="/assets/scss/style.scss" />
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
