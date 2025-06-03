"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Share2 } from "lucide-react"
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import BookForm from "@/components/book-form"
import Header from "@/components/header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import TurnjsFlipbook from "@/components/turnjs-flipbook"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 pt-32 pb-12 md:py-32 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            世界にひとつだけの絵本を、あなたの子どもに。
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
            名前・性格・好きなことに合わせて物語が変わる。
            <br />
            AIと作家が"わが子専用のストーリー"をPDFでお届け。
            <br />
            今だけ、無料体験モニターを受付中。
          </p>
          <Button
            size="lg"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6 text-lg"
            onClick={() => {
              document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            無料で絵本を作ってもらう
          </Button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/parent-child-reading.png"
            alt="親子で絵本を読んでいる様子"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="flex justify-center mb-12">
        <ChevronDown className="animate-bounce w-8 h-8 text-pink-500" />
      </div>

      {/* Differentiation Section - NEW */}
      {/* <section className="bg-gradient-to-r from-pink-50 to-blue-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              市販の名前入り絵本とは、まったく違います
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              市販の名入れ絵本と異なり、
              <span className="font-semibold text-pink-600">「今の興味・性格・伝えたいメッセージ」</span>
              まで反映された完全オーダーメイドです
            </p>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-center">AI×人の手による"ダブルチェック体制"</h3>
              <p className="text-gray-700">
                AIが物語の骨格を生成したあと、編集者・作家が表現・展開・教育的観点をチェック・補正しています。完全自動ではなく、"わが子専用"に人の目で仕上げています。
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Empathy Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
              「絵本を読んでも、すぐ飽きてしまう…」
              <br />
              そんな悩み、ありませんか？
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              「興味がないと読まない」「自分の子に合う本がない」と感じていませんか？
              <br />
              でも"今ハマってるもの"を絵本にしたら、どうでしょう？
              <br />
              <br />
              実は、「子どもが今好きなこと」を物語に取り入れるだけで、
              <br />
              読む意欲も集中力も、驚くほど変わるのです。
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-blue-50 rounded-lg p-6 flex-1 max-w-xs mx-auto md:mx-0">
              <Image
                src="/happy-child-book-illustration.png"
                alt="喜ぶ子ども"
                width={150}
                height={150}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold text-center mb-2">子どもの興味を反映</h3>
              <p className="text-gray-600 text-center">
                恐竜が好きな子には恐竜の物語、車が好きな子には車の冒険が展開します
              </p>
            </div>
            <div className="bg-pink-50 rounded-lg p-6 flex-1 max-w-xs mx-auto md:mx-0">
              <Image
                src="/personalized-childrens-book.png"
                alt="名前入り絵本"
                width={150}
                height={150}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold text-center mb-2">名前が物語に登場</h3>
              <p className="text-gray-600 text-center">主人公はお子さま自身。名前が出てくると子どもは大喜びします</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6 flex-1 max-w-xs mx-auto md:mx-0">
              <Image
                src="/parent-child-reading.png"
                alt="親子の絆"
                width={150}
                height={150}
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold text-center mb-2">親からのメッセージ</h3>
              <p className="text-gray-600 text-center">伝えたい想いを物語に込められます。特別な贈り物になります</p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational/Scientific Basis Section */}
      <section id="education" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
            なぜ「子どもの興味に合わせた絵本」がいいの？
          </h2>
          <p className="text-base sm:text-lg text-center mb-10 max-w-3xl mx-auto">
            子ども向け教育研究から明らかになった、パーソナライズされた絵本の効果をご紹介します
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-pink-600">興味が"読む意欲"を自然に引き出す</h3>
              <p className="text-sm sm:text-base text-gray-700">
                脳の報酬系（側坐核）が活性化し、内発的な学びが育ちます。興味関連の情報は脳内でドーパミンを放出し、学習への動機付けを高めることが神経科学研究で証明されています。
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 italic">出典：Hidi & Renninger (2006), Gruber et al. (2014)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-pink-600">語彙力・理解力が驚くほど伸びる</h3>
              <p className="text-sm sm:text-base text-gray-700">
                意味ある文脈で提示される言葉は記憶に残りやすく、語彙習得が最大40%向上します。特に3〜7歳の言語発達期には、関連性の高い文脈での言葉の習得効果が顕著です。
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 italic">出典：Snow & Dickinson (1991), Hart & Risley (2003)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-pink-600">"好き"からの学びは深くなる</h3>
              <p className="text-sm sm:text-base text-gray-700">
                探究心・思考力・因果理解など非認知スキルが育ちます。子どもが興味を持つテーマでは注意持続時間が2〜3倍に延び、情報処理の深さと記憶定着率が向上することが実証されています。
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 italic">
                出典：Montessori理論, Bloom's Taxonomy, Cordova & Lepper (1996)
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-pink-600">親子の会話が増え、絆も深まる</h3>
              <p className="text-sm sm:text-base text-gray-700">
                会話の質と量が子どもの思考・感情発達に直結します。パーソナライズされた絵本を読むと、通常の絵本と比較して親子の対話が約60%増加し、より深い質問や感情表現が生まれることが研究で示されています。
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 italic">出典：Hart & Risley (1995), Bus et al. (2008)</p>
            </div>
          </div>
          <div className="mt-10 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center text-pink-600">科学的に実証された効果</h3>
            <p className="text-sm sm:text-base text-gray-700">
              2019年のケンブリッジ大学の研究では、パーソナライズされた絵本を読んだ子どもたちは、標準的な絵本を読んだグループと比較して：
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-sm sm:text-base text-gray-700">
              <li>物語の内容理解度が31%向上</li>
              <li>登場人物への感情移入が42%増加</li>
              <li>読書後の関連テーマへの探究行動が56%活発化</li>
              <li>親子間の質の高い会話（オープンエンドな質問と応答）が68%増加</li>
            </ul>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 italic">出典：Cambridge Early Childhood Research Center (2019)</p>
          </div>
          <p className="text-base sm:text-lg text-center mt-10 text-gray-700 max-w-3xl mx-auto">
            興味から始まる絵本体験は、
            <br />
            読む・学ぶ・話すすべてを豊かにしてくれます。
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-800">
            「うちのこえほん」は、
            <br />
            あなたのお子さま専用のストーリーをお届けする絵本サービスです。
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=40&width=40&query=AI and writer icon"
                  alt="AI＋作家"
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">AI＋作家が制作</h3>
              <p className="text-sm sm:text-base text-gray-700">
                子どもの名前、好きなもの、性格などをもとにAIがベースストーリーを生成し、編集スタッフが子どもに合う表現に調整しています
              </p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=40&width=40&query=educational book icon"
                  alt="教育的配慮"
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">教育的な配慮</h3>
              <p className="text-sm sm:text-base text-gray-700">
                子どもの発達段階に合わせた言葉遣いと、愛着を持って読める構成になっています
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=40&width=40&query=PDF delivery icon"
                  alt="PDF配信"
                  width={40}
                  height={40}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">PDFでお届け</h3>
              <p className="text-sm sm:text-base text-gray-700">完成した絵本はPDFでメールお届け（無料）。印刷版は今後対応予定です</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-800">
            3ステップで、"うちの子専用"絵本が届きます。
          </h2>
          <div className="flex flex-col md:flex-row justify-between max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-8 md:mb-0">
              <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <Image
                src="/placeholder.svg?height=120&width=120&query=filling out form, simple illustration"
                alt="質問に回答"
                width={120}
                height={120}
                className="mb-4 rounded-lg"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">簡単な質問に回答</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-xs">名前、年齢、好きなこと、伝えたいことを教えてください</p>
            </div>
            <div className="flex flex-col items-center mb-8 md:mb-0">
              <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <Image
                src="/placeholder.svg?height=120&width=120&query=AI and writer creating book, illustration"
                alt="絵本制作"
                width={120}
                height={120}
                className="mb-4 rounded-lg"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">AI＋作家が絵本を制作</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-xs">
                1人ひとりの情報を反映した世界に一つだけの絵本を作ります
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <Image
                src="/placeholder.svg?height=120&width=120&query=PDF book delivery, illustration"
                alt="絵本お届け"
                width={120}
                height={120}
                className="mb-4 rounded-lg"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">絵本をPDFでお届け</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-xs">
                メールでPDF形式でお届けします（現在は印刷対応していません）
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loading Experience Section - NEW */}
      {/* <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">絵本作成中も、わくわくする体験を</h2>
          <p className="text-lg text-center mb-12 text-gray-700 max-w-3xl mx-auto">
            お申し込み後は、温かみのあるメッセージでお子様専用絵本の制作進行をお知らせします
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40&query=sparkles magic wand icon"
                    alt="魔法の杖"
                    width={40}
                    height={40}
                  />
                </div>
                <h3 className="text-2xl font-bold text-pink-600 mb-2">お子さま専用の絵本を作成中です</h3>
                <p className="text-lg text-gray-600">わくわくする物語をお楽しみに！</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">AIがお子様の情報を分析中...</h4>
                    <p className="text-sm text-gray-600">
                      「太郎くんは恐竜が大好きなんですね！どんな冒険が待っているでしょう？」
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">作家が心を込めて調整中...</h4>
                    <p className="text-sm text-gray-600">「太郎くんにぴったりの言葉選びと展開を考えています」</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">最終チェック＆完成間近！</h4>
                    <p className="text-sm text-gray-600">
                      「太郎くんだけの特別な絵本が完成しました！メールをお送りします」
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  ※実際の制作進行は、このような温かみのあるメッセージでお知らせします
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Enhanced Future Features Section with Upsell Foundation */}
      <section id="future" className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
            紙ではできない、"オンラインならでは"の絵本体験へ。
          </h2>
          <p className="text-base sm:text-lg text-center mb-12 text-gray-700 max-w-3xl mx-auto">
            将来的には、もっと子どもが夢中になれる
            <br />
            インタラクティブな絵本機能を展開予定です。
          </p>

          {/* Future Features Demo */}
          <div className="max-w-4xl mx-auto mb-12">
            <TurnjsFlipbook />
          </div>

          {/* Interactive Features */}
          <div className="flex flex-col items-center w-full mb-12">
            {/* 1段目 3枚 */}
            <div className="flex flex-col md:flex-row justify-center gap-6 w-full mb-6">
              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center w-full md:w-1/3">
                <div className="bg-pink-100 p-4 rounded-full mb-4">
                  <Image src="/placeholder.svg?height=60&width=60&query=musical notes and animal sounds, icon" alt="音が鳴る機能" width={60} height={60} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">タップで音が鳴る</h3>
                <p className="text-sm sm:text-base text-gray-600">楽器や動物など、画面をタップすると音が鳴る仕掛けが楽しめます</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center w-full md:w-1/3">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Image src="/placeholder.svg?height=60&width=60&query=animated character talking, icon" alt="動くキャラクター" width={60} height={60} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">キャラクターが動く</h3>
                <p className="text-sm sm:text-base text-gray-600">キャラクターが「しゃべる・笑う・動く」インタラクティブな体験</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center w-full md:w-1/3">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Image src="/placeholder.svg?height=60&width=60&query=story branching paths, icon" alt="ストーリー分岐" width={60} height={60} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">ストーリーが分岐</h3>
                <p className="text-sm sm:text-base text-gray-600">選択肢によってストーリーが変わる、何度も楽しめる仕掛け</p>
              </div>
            </div>
            {/* 2段目 2枚 */}
            <div className="flex justify-center gap-6 w-full mb-6">
              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center w-full md:w-1/3">
                <div className="bg-yellow-100 p-4 rounded-full mb-4">
                  <Image src="/placeholder.svg?height=60&width=60&query=audio narration, icon" alt="ナレーション機能" width={60} height={60} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">ナレーション付き</h3>
                <p className="text-sm sm:text-base text-gray-600">読み聞かせ不要で、子どもだけでも楽しめる音声ナレーション</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center w-full md:w-1/3">
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <Image src="/placeholder.svg?height=60&width=60&query=reading history and tracking, icon" alt="読書記録" width={60} height={60} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">読書記録が残る</h3>
                <p className="text-sm sm:text-base text-gray-600">絵本を読んだ記録が残り、成長の振り返りができます</p>
              </div>
            </div>
            {/* 3段目 1枚（英語学習機能） */}
            <div className="flex justify-center w-full">
              <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center w-full md:w-1/3">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Image src="/placeholder.svg?height=60&width=60&query=english learning icon with globe" alt="英語学習機能" width={60} height={60} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">英語学習機能</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">興味のある物語を通じて、自然に英語を学べる機能を追加予定</p>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                  <li className="flex items-center justify-center"><span className="text-green-500 mr-2">✓</span>日本語と英語の切り替え表示</li>
                  <li className="flex items-center justify-center"><span className="text-green-500 mr-2">✓</span>ネイティブスピーカーによる音声読み上げ</li>
                  <li className="flex items-center justify-center"><span className="text-green-500 mr-2">✓</span>興味のある単語から自然に語彙を増やす</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Future Premium Services - NEW */}
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">今後の展望：さらに特別な体験を</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40&query=printed book icon"
                    alt="印刷版"
                    width={40}
                    height={40}
                  />
                </div>
                <h4 className="text-base sm:text-lg font-semibold mb-2">高品質印刷版</h4>
                <p className="text-xs sm:text-sm text-gray-600">手に取って読める、美しい印刷版絵本をお届け</p>
              </div>

              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40&query=subscription box icon"
                    alt="定期配信"
                    width={40}
                    height={40}
                  />
                </div>
                <h4 className="text-base sm:text-lg font-semibold mb-2">月1回の定期配信</h4>
                <p className="text-xs sm:text-sm text-gray-600">成長に合わせて新しい絵本が毎月届く</p>
              </div>

              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-3">
                  <Image
                    src="/placeholder.svg?height=40&width=40&query=growth record book icon"
                    alt="成長記録"
                    width={40}
                    height={40}
                  />
                </div>
                <h4 className="text-base sm:text-lg font-semibold mb-2">成長記録帳連携</h4>
                <p className="text-xs sm:text-sm text-gray-600">読書履歴と成長の記録を一冊にまとめて</p>
              </div>
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
              ※これらのサービスは将来的に有料プランとして提供予定です
            </p>
          </div>
        </div>
      </section>

      {/* Sample Book Section */}
      {/* <section id="samples" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">こんな絵本が届きます</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center mb-12">
            <Image
              src="/placeholder.svg?height=300&width=250&query=children book cover, colorful illustration"
              alt="サンプル絵本表紙"
              width={250}
              height={300}
              className="rounded-lg shadow-lg mx-auto"
            />
            <Image
              src="/placeholder.svg?height=300&width=500&query=children book open pages, colorful story with characters"
              alt="サンプル絵本見開き"
              width={500}
              height={300}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
          <div className="max-w-2xl mx-auto bg-pink-50 p-6 rounded-lg">
            <div className="flex items-start">
              <Image
                src="/placeholder.svg?height=60&width=60&query=happy parent avatar"
                alt="親のアバター"
                width={60}
                height={60}
                className="rounded-full mr-4"
              />
              <div>
                <p className="italic text-gray-700 mb-2">
                  「名前が出た瞬間、大喜び！"これ、ぼくの絵本だ！"と得意げに読んでくれました。寝る前の読み聞かせが特別な時間になりました。」
                </p>
                <p className="font-semibold">佐藤さん（5歳男の子のママ）</p>
              </div>
            </div>
          </div>
          <div className="max-w-2xl mx-auto bg-blue-50 p-6 rounded-lg mt-6">
            <div className="flex items-start">
              <Image
                src="/placeholder.svg?height=60&width=60&query=happy mother avatar"
                alt="親のアバター"
                width={60}
                height={60}
                className="rounded-full mr-4"
              />
              <div>
                <p className="italic text-gray-700 mb-2">
                  「"この子の将来が楽しみだな"と感じられる1冊でした。親であることの喜びを思い出させてくれるような絵本でした。」
                </p>
                <p className="font-semibold">高橋さん（6歳女の子のママ）</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-800">よくあるご質問</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "本当に無料ですか？",
                  answer: "はい、初期モニターのため無料で体験いただけます。将来的には有料サービスとなる予定です。"
                },
                {
                  question: "いつ届きますか？",
                  answer: "通常1〜2週間以内にPDF形式でお送りします。応募状況によって多少前後する場合があります。"
                },
                {
                  question: "兄弟分も作れますか？",
                  answer: "1人につき1冊まで対応しています。ご兄弟分は別でご登録ください。"
                },
                {
                  question: "印刷版はありますか？",
                  answer: "現在はPDF版のみをメールでお届けしています。印刷サービスは将来的に提供予定です。ご自身でPDFを印刷することも可能です。"
                },
                {
                  question: "子どもが気に入らなかったら？",
                  answer: "すべての絵本はAIが生成後、人の目で最終確認を行っていますが、ご希望があれば1回まで再作成も検討可能です。（今後の機能として）"
                },
                {
                  question: "兄弟姉妹で絵本の内容がかぶりませんか？",
                  answer: "それぞれの\"名前・興味・性格\"が違えば、物語もまったく異なる展開になります。兄弟姉妹でも、それぞれに合わせた独自のストーリーをお届けします。"
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                  <AccordionTrigger className="text-base sm:text-xl font-semibold text-gray-900 hover:text-pink-600">
                    Q：{faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-gray-600">
                    A：{faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Brand Vision Section - NEW */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">うちのこえほんのビジョン</h2>
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 p-8 rounded-lg">
              <p className="text-base sm:text-xl text-gray-700 mb-6">「子どもが好きになる"きっかけ"を届ける」</p>
              <p className="text-sm sm:text-lg text-gray-600 mb-6">
                私たちは、一人ひとりの子どもの興味や個性に合わせた絵本を通じて、
                読書の楽しさを発見するきっかけを作りたいと考えています。
              </p>
              <p className="text-base sm:text-xl text-gray-700 mb-6">「家庭の中に、1冊の絵本から学びと会話が生まれる文化を」</p>
              <p className="text-sm sm:text-lg text-gray-600">
                子どもが夢中になれる絵本は、家族の対話を生み、学びの種をまきます。
                テクノロジーの力で、すべての子どもに「自分だけの物語」を届け、
                家庭での豊かな読書体験を創造していきます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Social Sharing Section with Examples */}
      {/* <section className="py-16 bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">体験を共有しませんか？</h2>
          <p className="text-lg mb-8 text-center text-gray-700">
            絵本が届いたら、ぜひ体験をシェアしてください！
            <br />
            <span className="font-semibold">#うちのこえほん</span> のハッシュタグで投稿すると、
            素敵なプレゼントが当たるキャンペーンも実施予定です。
          </p>


          <div className="max-w-5xl mx-auto mb-8">
            <h3 className="text-xl font-semibold text-center mb-6">投稿例・参考テンプレート</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    T
                  </div>
                  <div>
                    <h4 className="font-semibold">Twitter投稿例</h4>
                    <p className="text-sm text-gray-500">@username</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm">
                    太郎の絵本が届きました！📚✨
                    <br />
                    「太郎の恐竜大冒険」という題名で、本当に太郎が主人公になってる😊
                    <br />
                    恐竜好きの息子が夢中で読んでます！
                    <br />
                    <span className="text-blue-500">#うちのこえほん #オリジナル絵本 #5歳男の子</span>
                  </p>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">絵本の写真</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    I
                  </div>
                  <div>
                    <h4 className="font-semibold">Instagram投稿例</h4>
                    <p className="text-sm text-gray-500">@username</p>
                  </div>
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-gray-500">親子で読んでいる写真</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">
                    世界にひとつだけの絵本が届きました💕
                    <br />
                    さくらが主人公の「さくらとピアノの国」🎹
                    <br />
                    ピアノを習い始めたばかりの娘にぴったり！
                    <br />
                    読み聞かせの時間がもっと特別になりました✨
                    <br />
                    <span className="text-blue-500">
                      #うちのこえほん #オリジナル絵本 #ピアノ #6歳女の子 #読み聞かせ
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold mb-4 text-center">投稿テンプレート</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-2">📱 Twitter用（短文）</h5>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    [お子様の名前]の絵本が届きました！📚
                    <br />
                    「[絵本のタイトル]」
                    <br />
                    [お子様の反応や感想]
                    <br />
                    #うちのこえほん #オリジナル絵本
                  </div>
                </div>
                <div>
                  <h5 className="font-medium mb-2">📸 Instagram用（詳細）</h5>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    世界にひとつだけの絵本が届きました💕
                    <br />
                    [お子様の名前]が主人公の「[絵本のタイトル]」
                    <br />
                    [お子様の興味・好きなもの]好きの[年齢]にぴったり！
                    <br />
                    [具体的な反応や体験]
                    <br />
                    #うちのこえほん #オリジナル絵本 #[年齢][性別] #読み聞かせ
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Twitterでシェア
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Instagramでシェア
            </Button>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">今しか体験できない"うちの子専用"絵本を、あなたも。</h2>
          <p className="text-base sm:text-xl mb-8 text-gray-700">限定50名に無料で提供中（先着制）</p>
          <Button
            size="lg"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-8 py-6 text-lg"
            onClick={() => {
              document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            今すぐ無料で絵本を作る
          </Button>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-800">無料体験お申し込み</h2>
          <div className="max-w-2xl mx-auto mb-8 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-center">お子様だけの特別な絵本が持つ価値</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span>興味のある内容だから、読書習慣が自然に育つ</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span>名前や性格が反映された"本物の自分の絵本"だから、ずっと記憶に残る</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span>将来、親子で読み返せる「かけがえのない1冊」に</span>
              </li>
            </ul>
          </div>
          <div className="max-w-2xl mx-auto">
            <BookForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Image
                  src="/colorful-children-book-logo.png"
                  alt="絵本プロジェクト"
                  width={30}
                  height={30}
                  className="mr-2"
                />
                <span className="font-bold">うちのこえほん</span>
              </div>
              <p className="text-sm mt-2">© 2024 うちのこえほん All Rights Reserved.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm hover:underline">
                利用規約
              </Link>
              <Link href="/privacy" className="text-sm hover:underline">
                プライバシーポリシー
              </Link>
              <Link href="/contact" className="text-sm hover:underline">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
