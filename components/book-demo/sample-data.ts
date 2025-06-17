import { DemoBook } from './types';

export const sampleBook: DemoBook = {
  title: "○○ちゃんの大冒険",
  coverImage: "/adventure-children-book.png",
  pages: [
    {
      id: 1,
      imageUrl: "/ittan.png",
      altText: "元気いっぱいの○○ちゃんが手を振って笑っているイラスト",
      text: "今日は○○ちゃんの特別な日です。新しい冒険が始まります！",
      highlightWords: ["○○ちゃん"]
    },
    {
      id: 2,
      imageUrl: "/adventure-children-book.png",
      altText: "○○ちゃんが森の中で動物たちと出会っているイラスト",
      text: "森の奥で、○○ちゃんはたくさんの動物たちと出会いました。「こんにちは！」と元気よく挨拶します。",
      highlightWords: ["○○ちゃん"]
    },
    {
      id: 3,
      imageUrl: "/dinosaur-children-book-cover.png",
      altText: "○○ちゃんが恐竜と友達になっているイラスト",
      text: "突然現れた恐竜さんも、○○ちゃんの優しい心に気づいて仲良しになりました。",
      highlightWords: ["○○ちゃん"]
    },
    {
      id: 4,
      imageUrl: "/piano-children-book-cover.png",
      altText: "○○ちゃんがピアノを弾いて音楽を奏でているイラスト",
      text: "○○ちゃんは美しい音楽でみんなを笑顔にしました。森中に素敵な歌声が響きます。",
      highlightWords: ["○○ちゃん"]
    },
    {
      id: 5,
      imageUrl: "/personalized-childrens-book.png",
      altText: "○○ちゃんが友達と一緒に虹を見ているイラスト",
      text: "冒険の最後に、○○ちゃんと新しい友達みんなで美しい虹を見ました。",
      highlightWords: ["○○ちゃん"]
    },
    {
      id: 6,
      imageUrl: "/parent-child-reading.png",
      altText: "○○ちゃんが家族と一緒に本を読んでいるイラスト",
      text: "お家に帰った○○ちゃんは、パパとママに今日の冒険をお話ししました。「また明日も冒険しようね！」",
      highlightWords: ["○○ちゃん"]
    }
  ]
};