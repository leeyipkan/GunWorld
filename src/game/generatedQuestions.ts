import type { Question } from "./types";

function numberChoices(answer: number): string[] {
  const set = new Set<string>([String(answer)]);
  for (const n of [answer + 1, answer - 1, answer + 2, answer - 2, answer + 3, 0, 10, 20, 5]) {
    if (n < 0 || n > 30) continue;
    set.add(String(n));
    if (set.size >= 3) break;
  }
  return [...set].slice(0, 3);
}

function pickOthers(all: string[], answer: string, count = 2): string[] {
  const rest = all.filter((item) => item !== answer);
  const out: string[] = [];
  for (const item of rest) {
    if (!out.includes(item)) out.push(item);
    if (out.length >= count) break;
  }
  return out;
}

function q(
  id: string,
  category: Question["category"],
  prompt: string,
  answer: string,
  options: string[],
  explain: string,
): Question | null {
  const uniq = [...new Set(options)];
  if (!uniq.includes(answer) || uniq.length < 3) return null;
  return { id, category, prompt, options: uniq.slice(0, 3), answer, explain };
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const letters = "abcdefghijklmnopqrstuvwxyz".split("");

const CHAR_MEANING: Array<[string, string]> = [
  ["日", "太陽／白天"], ["月", "月亮"], ["水", "可以飲"], ["火", "好熱"], ["木", "樹"],
  ["山", "好高嘅山"], ["石", "石頭"], ["田", "種田"], ["土", "泥土"], ["天", "天空"],
  ["地", "地下"], ["大", "大過細"], ["小", "細過大"], ["上", "向上"], ["下", "向下"],
  ["中", "中間"], ["左", "左邊"], ["右", "右邊"], ["人", "人"], ["手", "用手"],
  ["口", "用口"], ["目", "用眼睇"], ["耳", "用耳聽"], ["心", "心意"], ["力", "氣力"],
  ["車", "車"], ["門", "出入"], ["風", "風"], ["雨", "落雨"], ["花", "花"],
  ["草", "草"], ["鳥", "會飛"], ["魚", "游水"], ["蟲", "細生物"], ["牛", "牛"],
  ["羊", "羊"], ["馬", "馬"], ["米", "食米"], ["禾", "禾苗"], ["白", "白色"],
  ["紅", "紅色"], ["青", "青色"], ["學", "學習"], ["生", "生活"], ["校", "學校"],
  ["家", "屋企"], ["友", "朋友"], ["早", "朝早"], ["晚", "夜晚"], ["春", "春天"],
  ["夏", "夏天"], ["秋", "秋天"], ["冬", "冬天"], ["江", "江河"], ["河", "河"],
  ["海", "大海"], ["雲", "白雲"], ["電", "電"], ["你", "你"], ["我", "我"],
  ["他", "他"], ["一", "1"], ["二", "2"], ["三", "3"], ["四", "4"], ["五", "5"],
  ["六", "6"], ["七", "7"], ["八", "8"], ["九", "9"], ["十", "10"],
  ["爸", "爸爸"], ["媽", "媽媽"], ["兒", "仔女"], ["子", "孩子"], ["女", "女孩"],
  ["來", "過來"], ["去", "離去"], ["有", "擁有"], ["不", "唔係"], ["是", "係"],
];

const MEASURES: Array<[string, string]> = [
  ["本", "書"], ["隻", "貓"], ["條", "魚"], ["朵", "花"], ["輛", "車"],
  ["支", "筆"], ["頂", "帽"], ["雙", "鞋"], ["件", "衫"], ["把", "傘"],
  ["間", "屋"], ["位", "老師"], ["座", "山"], ["顆", "糖"], ["片", "葉"],
  ["張", "紙"], ["杯", "水"], ["碗", "飯"], ["群", "羊"], ["棵", "樹"],
];

const OPPOSITES: Array<[string, string]> = [
  ["大", "小"], ["上", "下"], ["左", "右"], ["多", "少"], ["來", "去"],
  ["早", "晚"], ["開", "關"], ["長", "短"], ["高", "矮"], ["快", "慢"],
  ["冷", "熱"], ["黑", "白"], ["新", "舊"], ["前", "後"], ["內", "外"],
  ["好", "壞"], ["遠", "近"], ["輕", "重"], ["乾", "濕"], ["亮", "暗"],
];

const WORDS: Array<[string, string]> = [
  ["朋友", "一齊玩嘅人"], ["老師", "教書嘅人"], ["學校", "讀書嘅地方"], ["家庭", "爸爸媽媽同你"],
  ["早上", "天亮嗰陣"], ["晚上", "天黑嗰陣"], ["吃飯", "食飯"], ["洗手", "食前要做"],
  ["刷牙", "保護牙齒"], ["香港", "我哋住嘅城市"], ["巴士", "公共交通"], ["地鐵", "地下火車"],
  ["公園", "可以玩嘅地方"], ["醫院", "睇醫生"], ["警察", "幫助安全"], ["天氣", "熱冷風雨"],
  ["春天", "花開季節"], ["冬天", "好凍季節"], ["水果", "蘋果香蕉"], ["蔬菜", "青菜"],
];

const EN_WORDS: Array<[string, string, string]> = [
  ["cat", "貓", "C"], ["dog", "狗", "D"], ["pig", "豬", "P"], ["sun", "太陽", "S"],
  ["bus", "巴士", "B"], ["red", "紅色", "R"], ["book", "書", "B"], ["mum", "媽媽", "M"],
  ["dad", "爸爸", "D"], ["pen", "筆", "P"], ["bag", "書包", "B"], ["hat", "帽", "H"],
  ["egg", "蛋", "E"], ["milk", "牛奶", "M"], ["rice", "飯", "R"], ["cake", "蛋糕", "C"],
  ["tree", "樹", "T"], ["bird", "鳥", "B"], ["car", "車", "C"], ["fish", "魚", "F"],
  ["ball", "波", "B"], ["boy", "男孩", "B"], ["girl", "女孩", "G"], ["bed", "床", "B"],
  ["cup", "杯", "C"], ["box", "盒", "B"], ["ant", "螞蟻", "A"], ["bee", "蜜蜂", "B"],
  ["duck", "鴨", "D"], ["frog", "青蛙", "F"], ["rain", "雨", "R"], ["wind", "風", "W"],
  ["moon", "月亮", "M"], ["star", "星星", "S"], ["hand", "手", "H"], ["foot", "腳", "F"],
  ["eye", "眼", "E"], ["ear", "耳", "E"], ["nose", "鼻", "N"], ["mouth", "口", "M"],
  ["apple", "蘋果", "A"], ["school", "學校", "S"], ["water", "水", "W"], ["blue", "藍色", "B"],
  ["green", "綠色", "G"], ["yellow", "黃色", "Y"], ["one", "一", "O"], ["two", "二", "T"],
  ["three", "三", "T"], ["ten", "十", "T"],
];

const GS_ITEMS: Array<[string, string, string, string]> = [
  ["落雨帶咩最啱？", "雨傘", "太陽眼鏡", "雪糕", "落雨帶傘先唔濕。"],
  ["出街好熱應該飲？", "水", "洗衣液", "膠水", "熱就要補水。"],
  ["過馬路見到紅燈要？", "停", "衝", "閉眼", "紅燈停、綠燈行。"],
  ["綠燈先可以？", "小心行", "跑步追車", "玩手機", "綠燈都要睇車。"],
  ["垃圾應該放去？", "垃圾桶", "海", "草地", "垃圾入桶。"],
  ["食飯前要？", "洗手", "拍波", "唔洗", "洗手減少病菌。"],
  ["朝晚都要？", "刷牙", "食糖", "唔沖涼", "刷牙保護牙齒。"],
  ["過馬路要行？", "斑馬線", "隧道頂", "車路中間", "斑馬線安全。"],
  ["唔舒服要話俾？", "爸爸媽媽或老師", "陌生人", "唔好講", "大人可以幫手。"],
  ["陌生人請你上车？", "拒絕同找大人", "即刻上车", "保密", "唔跟陌生人走。"],
  ["火警要？", "叫大人同離開", "匿喺房", "用被遮", "有火快走。"],
  ["太陽好猛要？", "戴帽遮陰", "望實太陽", "著厚褸", "保護皮膚同眼。"],
  ["玩具玩完要？", "執好", "丟低", "掟走", "玩具要執好。"],
  ["過馬路可唔可以玩電話？", "唔可以", "可以", "要睇片", "過路要睇車。"],
  ["耳朵唔好？", "塞細嘢", "洗手", "戴帽", "細物件唔好入耳。"],
  ["運動後應該？", "休息同飲水", "即食十隻雪糕", "唔出聲", "運動後休息。"],
  ["書包太重要？", "話俾大人知", "自己忍", "掉書包", "大人可以幫你。"],
  ["夜晚身體需要？", "瞓覺休息", "跑步", "曬太陽", "瞓覺先有氣力。"],
  ["牙齒痛應該？", "話大人知去睇牙醫", "食更多糖", "唔出聲", "牙醫可以醫。"],
  ["洗手要用？", "番梘同清水", "泥", "油", "番梘洗得乾淨。"],
  ["過馬路要同邊個一齊最安全？", "大人", "自己衝", "陌生人", "細路同大人過路。"],
  ["公園唔好？", "爬高欄杆", "行行人路", "執玩具", "危險動作唔好做。"],
  ["電梯門快關要？", "等下一轉", "用手擋門", "踎低", "唔好擋門。"],
  ["藥唔可以？", "自己亂食", "大人俾先食", "睇醫生", "藥要大人睇住。"],
  ["游泳要有？", "大人陪伴", "一個人去深水", "食飽即游", "游水要大人。"],
  ["刀同剪刀要？", "大人幫手先用", "對住朋友舞", "放口度", "利器好危險。"],
  ["插座唔好？", "用手指插", "叫大人插電", "關燈", "電好危險。"],
  ["咳嗽時要？", "掩口鼻", "對住人咳", "唔出聲忍", "掩住口先有禮貌同衛生。"],
  ["過馬路要望？", "左右車輛", "地下只係", "天空雲", "要睇車。"],
  ["飲管、膠袋唔好？", "套頭上", "用完丟垃圾桶", "摺好", "套頭會窒息。"],
];

export function generatedQuestions(skipPrompts: Set<string>): Question[] {
  const out: Question[] = [];
  const usedIds = new Set<string>();

  const add = (item: Question | null): void => {
    if (!item) return;
    if (skipPrompts.has(item.prompt) || usedIds.has(item.id)) return;
    if (new Set(item.options).size !== item.options.length) return;
    usedIds.add(item.id);
    skipPrompts.add(item.prompt);
    out.push(item);
  };

  for (let a = 0; a <= 20; a += 1) {
    for (let b = 0; b <= 20 - a; b += 1) {
      const sum = a + b;
      add(q(`gen_add_${a}_${b}`, "math", `${a} + ${b} = ?`, String(sum), numberChoices(sum), `${a} 加 ${b} 等於 ${sum}。`));
      if (a >= b) {
        add(q(`gen_sub_${a}_${b}`, "math", `${a} - ${b} = ?`, String(a - b), numberChoices(a - b), `${a} 減 ${b} 等於 ${a - b}。`));
      }
    }
  }

  for (let total = 2; total <= 20; total += 1) {
    for (let a = 0; a <= total; a += 1) {
      const missing = total - a;
      add(q(`gen_miss_add_${a}_${total}`, "math", `${a} + □ = ${total}`, String(missing), numberChoices(missing), `${a} 再加 ${missing} 就係 ${total}。`));
      if (total >= a) {
        add(q(`gen_miss_sub_${total}_${a}`, "math", `${total} - □ = ${a}`, String(total - a), numberChoices(total - a), `${total} 減 ${total - a} 剩 ${a}。`));
      }
    }
  }

  for (let i = 0; i <= 20; i += 1) {
    for (let j = i + 1; j <= 20; j += 1) {
      const extra = i === 0 ? j + 1 : Math.max(0, i - 1);
      add(q(`gen_cmp_${j}_${i}`, "math", `邊個較大：${i} 定 ${j}？`, String(j), [String(j), String(i), String(extra > 20 ? i + 1 : extra)], `${j} 大過 ${i}。`));
      add(q(`gen_cmp_small_${i}_${j}`, "math", `邊個較細：${i} 定 ${j}？`, String(i), [String(i), String(j), String(Math.min(20, j + 1))], `${i} 細過 ${j}。`));
    }
  }

  for (let n = 1; n <= 10; n += 1) {
    for (let m = 1; m <= 10 - n; m += 1) {
      add(q(`gen_count_${n}_${m}`, "math", `有 ${n} 個蘋果，再加 ${m} 個，一共幾個？`, String(n + m), numberChoices(n + m), `${n} + ${m} = ${n + m}。`));
    }
  }

  const chars = CHAR_MEANING.map(([ch]) => ch);
  CHAR_MEANING.forEach(([ch, meaning], index) => {
    const others = pickOthers(chars, ch, 2);
    add(q(`gen_ch_mean_${index}`, "chinese", `「${ch}」通常指？`, meaning, [meaning, CHAR_MEANING[(index + 3) % CHAR_MEANING.length]?.[1] ?? "石頭", CHAR_MEANING[(index + 7) % CHAR_MEANING.length]?.[1] ?? "汽車"], `「${ch}」同「${meaning}」有關。`));
    add(q(`gen_ch_char_${index}`, "chinese", `${meaning}，用邊個字？`, ch, [ch, ...others], `${meaning} 用「${ch}」。`));
    add(q(`gen_ch_pick_${index}`, "chinese", `邊個係「${ch}」字？`, ch, [ch, ...others], `認字：${ch}。`));
  });

  MEASURES.forEach(([mw, noun], index) => {
    const otherMw = pickOthers(MEASURES.map(([m]) => m), mw, 2);
    add(q(`gen_mw_${index}`, "chinese", `一＿${noun}，量詞係？`, mw, [mw, ...otherMw], `一${mw}${noun}。`));
    add(q(`gen_mw_noun_${index}`, "chinese", `「${mw}」常常配邊樣？`, noun, [noun, ...pickOthers(MEASURES.map(([, n]) => n), noun, 2)], `${mw}配${noun}。`));
  });

  OPPOSITES.forEach(([a, b], index) => {
    add(q(`gen_opp_${index}`, "chinese", `「${a}」相反係？`, b, [b, a, OPPOSITES[(index + 2) % OPPOSITES.length]?.[1] ?? "中"], `${a} 嘅相反係 ${b}。`));
    add(q(`gen_opp_rev_${index}`, "chinese", `「${b}」相反係？`, a, [a, b, OPPOSITES[(index + 4) % OPPOSITES.length]?.[0] ?? "中"], `${b} 嘅相反係 ${a}。`));
  });

  WORDS.forEach(([word, meaning], index) => {
    const wrong = `${word.slice(0, Math.max(1, word.length - 1))}叉`;
    const wrong2 = `${word[0] ?? "好"}好`;
    add(q(`gen_word_${index}`, "chinese", `「${word}」意思最接近？`, meaning, [meaning, WORDS[(index + 2) % WORDS.length]?.[1] ?? "跑步", WORDS[(index + 5) % WORDS.length]?.[1] ?? "畫畫"], `${word}：${meaning}。`));
    add(q(`gen_word_spell_${index}`, "chinese", `邊個寫法啱？`, word, [word, wrong, wrong2], `正確係${word}。`));
  });

  LETTERS.forEach((letter, index) => {
    const next = LETTERS[index + 1];
    const prev = LETTERS[index - 1];
    const lower = letters[index] ?? letter.toLowerCase();
    const distract = pickOthers(LETTERS, letter, 2);
    add(q(`gen_let_${letter}`, "english", `邊個係字母 ${letter}？`, letter, [letter, ...distract], `呢個字母係 ${letter}。`));
    add(q(`gen_let_low_${letter}`, "english", `${letter} 嘅細楷係？`, lower, [lower, letters[(index + 1) % 26] ?? "b", letters[(index + 2) % 26] ?? "c"], `${letter} 配 ${lower}。`));
    add(q(`gen_let_up_${letter}`, "english", `${lower} 嘅大楷係？`, letter, [letter, ...distract], `${lower} 配 ${letter}。`));
    add(q(`gen_let_pos_${letter}`, "english", `字母表第 ${index + 1} 個係？`, letter, [letter, ...distract], `第 ${index + 1} 個係 ${letter}。`));
    if (next) {
      add(q(`gen_let_next_${letter}`, "english", `${letter} 後面係邊個字母？`, next, [next, letter, LETTERS[Math.min(25, index + 2)] ?? "Z"], `${letter} 之後係 ${next}。`));
    }
    if (prev) {
      add(q(`gen_let_prev_${letter}`, "english", `${letter} 前面係邊個字母？`, prev, [prev, letter, LETTERS[Math.max(0, index - 2)] ?? "A"], `${letter} 之前係 ${prev}。`));
    }
    const vowel = "AEIOU".includes(letter);
    add(q(`gen_let_vowel_${letter}`, "english", `${letter} 係母音（vowel）嗎？`, vowel ? "係" : "唔係", ["係", "唔係", "唔知"], vowel ? `${letter} 係 A E I O U 之一。` : `${letter} 唔係母音。`));
  });

  const enWords = EN_WORDS.map(([w]) => w);
  const enMeanings = EN_WORDS.map(([, m]) => m);
  EN_WORDS.forEach(([word, meaning, start], index) => {
    add(q(`gen_en_mean_${word}`, "english", `${word} 係咩意思？`, meaning, [meaning, ...pickOthers(enMeanings, meaning, 2)], `${word} = ${meaning}。`));
    add(q(`gen_en_word_${word}`, "english", `${meaning} 英文係？`, word, [word, ...pickOthers(enWords, word, 2)], `${meaning} 係 ${word}。`));
    add(q(`gen_en_start_${word}`, "english", `${word} 開頭字母係？`, start, [start, ...pickOthers(LETTERS, start, 2)], `${word} 由 ${start} 開始。`));
    add(q(`gen_en_len_${word}`, "english", `${word} 有幾個字母？`, String(word.length), numberChoices(word.length), `${word} 有 ${word.length} 個字母。`));
    const scrambled = `${word.slice(1)}${word[0] ?? ""}`;
    if (scrambled !== word) {
      add(q(`gen_en_spell_${word}`, "english", `邊個拼法啱？`, word, [word, scrambled, `${word}s`], `正確係 ${word}。`));
    }
  });

  GS_ITEMS.forEach(([prompt, answer, d1, d2, explain], index) => {
    add(q(`gen_gs_${index}`, "gs", prompt, answer, [answer, d1, d2], explain));
  });

  const weather: Array<[string, string, string, string]> = [
    ["落雨", "雨傘", "短袖", "太陽眼鏡"],
    ["大太陽", "帽同水", "雨靴", "厚圍巾"],
    ["好凍", "褸", "泳衣", "拖鞋"],
    ["打風", "留喺室內", "去海邊玩", "放風箏近電綫"],
    ["落雹", "入屋", "抬頭睇", "出去跑"],
    ["好濕滑", "慢慢行", "快跑", "跳過馬路"],
  ];
  weather.forEach(([when, good, bad1, bad2], index) => {
    add(q(`gen_gs_w_${index}`, "gs", `${when} 應該點？`, good, [good, bad1, bad2], `${when} 要 ${good}。`));
    add(q(`gen_gs_w2_${index}`, "gs", `${when} 唔應該點？`, bad1, [bad1, good, "聽大人話"], `${when} 唔好 ${bad1}。`));
  });

  const places: Array<[string, string]> = [
    ["學校", "讀書同見老師"], ["公園", "玩同散步"], ["醫院", "睇醫生"], ["超市", "買餸"],
    ["圖書館", "睇書要安靜"], ["消防局", "消防員工作"], ["警察局", "警察工作"], ["海邊", "要大人陪"],
    ["馬路", "小心車輛"], ["課室", "聽老師講"], ["食堂", "食飯"], ["洗手間", "洗手同如廁"],
  ];
  places.forEach(([place, use], index) => {
    add(q(`gen_gs_pl_${index}`, "gs", `${place} 主要用來？`, use, [use, places[(index + 1) % places.length]?.[1] ?? "瞓覺", places[(index + 2) % places.length]?.[1] ?? "煮食"], `${place}：${use}。`));
    add(q(`gen_gs_pl2_${index}`, "gs", `想「${use}」去邊？`, place, [place, ...pickOthers(places.map(([p]) => p), place, 2)], `${use} 去${place}。`));
  });

  const body: Array<[string, string]> = [
    ["眼", "睇"], ["耳", "聽"], ["鼻", "嗅"], ["口", "食同講"], ["手", "攞同寫"],
    ["腳", "行同跑"], ["牙", "咬食物"], ["皮膚", "保護身體"], ["頭", "戴帽保護"], ["骨", "撑起身體"],
  ];
  body.forEach(([part, use], index) => {
    add(q(`gen_gs_bd_${index}`, "gs", `${part} 主要用來？`, use, [use, body[(index + 1) % body.length]?.[1] ?? "飛", body[(index + 3) % body.length]?.[1] ?? "發光"], `${part}用來${use}。`));
    add(q(`gen_gs_bd2_${index}`, "gs", `用嚟「${use}」嘅係？`, part, [part, ...pickOthers(body.map(([p]) => p), part, 2)], `${use} 靠${part}。`));
  });

  const foods = ["蘋果", "香蕉", "橙", "飯", "青菜", "魚", "蛋", "奶", "包", "番茄"];
  const junk = ["成日只食糖", "只飲汽水", "不食蔬菜"];
  foods.forEach((food, index) => {
    add(q(`gen_gs_fd_${index}`, "gs", `${food} 屬於？`, "食物", ["食物", "玩具", "文具"], `${food} 係食物。`));
    add(q(`gen_gs_fd2_${index}`, "gs", `食${food}之外，仲應該食？`, "蔬菜同飯", ["蔬菜同飯", junk[index % junk.length] ?? "只食糖", "只飲汽水"], "各種食物都要食少少。"));
  });

  const hk: Array<[string, string, string, string]> = [
    ["香港常用語言有？", "粵語同中文英文", "淨係火星文", "淨係文言文"],
    ["香港過馬路要睇？", "車同燈號", "只睇廣告", "閉眼走"],
    ["香港夏天常常？", "好熱同有時落雨", "成日落雪", "終年結冰"],
    ["八號風球應該？", "留喺安全地方", "去海邊睇浪", "去山頂野餐"],
    ["搭巴士要？", "拉緊扶手同聽司機", "車廂跑跳", "頭伸出窗外"],
    ["扶手電梯要？", "企定同握扶手", "倒後行", "坐喺梯級"],
  ];
  hk.forEach(([prompt, answer, d1, d2], index) => {
    add(q(`gen_gs_hk_${index}`, "gs", prompt, answer, [answer, d1, d2], answer));
  });

  return out;
}
