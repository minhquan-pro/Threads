import { useCurrentUser } from "@/features/auth";

import CreatePost from "@/components/Posts/components/CreatePost";
import FeedItem from "@/components/Posts/FeedItem";
import { useIsDesktop } from "@/hooks";

// Dữ liệu demo
const DEMO_POSTS = [
  {
    id: 222,
    user: {
      id: 111,
      username: "khanhVy",
      name: "Khánh Vy",
      avatar_url:
        "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/453222907_1010838550413842_6211143939307217198_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XWPjQO-wBLkQ7kNvwEekuYf&_nc_oc=AdlJsMf6kef3jowiwR1_tI2R_aRauTRRvzaJKqyprJqLvZU2Dg0QbiDKCtx75RZ5o0k&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=O0s0hufngdDApKBUXTCzZg&oh=00_Afq0Aq_9EFE6z02AajQZm_Y8GVU37dJZ_Yj45_oPCt_pXA&oe=6966F285",
      verified: true,
      isFollowing: true,
    },
    content: `📺 Xem gì để cả năm vui vẻ và luôn có niềm tin? 
🫶🏻 Top1: "Bản giao hưởng Việt Nam" ✨
Năm 2026 tới với những thanh âm rộn ràng của một bản giao hưởng đầy tự hào 💕 Hãy cùng Vy theo dõi hành trình của những câu chuyện và khát vọng vươn lên của người Việt được thể hiện qua tiết mục nghệ thuật mãn nhãn chỉ có tại “Chào năm mới 2026 - Bản giao hưởng Việt Nam” 
📺 Đón xem chương trình vào lúc 20h10 ngày 01/01/2026 trên kênh VTV1 nha 💕`,
    media_urls: [
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/605635930_1386510262846667_7732816289108268982_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8692yEgGkB4Q7kNvwEAeigg&_nc_oc=AdlMri8pCODbxbuXiw5OB9z-OdIlpklNHgYXlFeChZuqtirlJ4yUoDmO4f18n7Jcb4I&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=wuTOgCmaRWUN_Tt4WLzA_w&oh=00_Afor8vR7wMtmUhPl6QdrRYX3-EI1CVpTNFdrBoQIQpYOXw&oe=6966E534",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/608746080_1386510266180000_1903393757452748705_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=u_t2_GS_1w0Q7kNvwHx627W&_nc_oc=Adkjv8uzflCUgIycnRwzdg7h9xfOmnphdYfqBVa4x7Iaw_B2a-OKGVwOBO_T4i9dQKY&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=xPDsGXs7uUf5h-R5e1Z59w&oh=00_Afq5J3RH56GwdHj-iAc0xhKdX5q0TgpW4Lhk1Wk913WH5w&oe=696716CA",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/606871653_1386510289513331_143936856456174911_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=qJs5CzkvVk4Q7kNvwFhElH3&_nc_oc=Adl5xFYm6qYFivwwZ6mCn8ofUHrqTB6OWvqV4AwXc7HUZvy_QAJKtHybJiKqOz8ohjE&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=53DWNRMlv4Ba3i_OB60kIA&oh=00_Afpsn9XT1ZXgG67w-S31r_1KTKlrqUWat5pmJPUOULwH2w&oe=69670B7C",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/603856581_1386510246180002_8470671797933348321_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=iBUL5vUzrA4Q7kNvwEiOobV&_nc_oc=Adl-HsgehktMoHQh2EKBIDkRg-7ZT9HjaAPAXLji0wpoON4GrmygJ9SI3BcYUS83KNA&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=IA2bGYdGJX_esJVUDnACbw&oh=00_Afr9A6jk0ycW-8aYvMU7TUkuxpGm7neQ_D4Mmy62O99YDw&oe=696709B0",
    ],
    likes_count: 5100,
    reposts_and_quotes_count: 19,
    replies_count: 77,
    created_at: "2025-11-13T08:02:04.000000Z",
    is_liked_by_auth: true,
  },
  {
    id: 11111,
    user: {
      id: 111,
      username: "minhquan",
      name: "Minh Quân",
      avatar_url:
        "https://pbs.twimg.com/profile_images/1918837316363460608/HxopZPPG_400x400.jpg",
      verified: true,
      isFollowing: true,
    },
    content:
      "Coding all night, debugging all day 💻☕ Just shipped a new feature and feeling accomplished! Who else is grinding on their projects this weekend?",
    media_urls: [
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/610288126_25395585366802027_8879659816069396604_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_ohc=UroFJbmv8JIQ7kNvwHlXZ1_&_nc_oc=AdlfD0df2uxW0u3TzJTh9RY-9BTW7jvGLbTI-G_zZ3A91QOZq7BDGnnl4a2p7kpWggw&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&oh=03_Q7cD4QHgZE1SlbkCH-1AFBoDxuaiBmesDJ3Cl-X2RyAVN4PP1Q&oe=698876EF",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/600229015_1628612361832515_7607035518655288901_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=QLSf1gQ4kpQQ7kNvwEI0Grs&_nc_oc=Adl8BVTpoyszzRvxUDrTzSU8cqllfI9qJAKysvmHiziIUmCJSLSaQxYLUp6gPcHjNjQ&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&oh=03_Q7cD4QGdEfo5t59DtMb2c2f95zgXMzD6xaHVamgHv4Rz-rgRXw&oe=69887975",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/610288126_882913060877448_2135938722632434481_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_ohc=pJOuSerM6QsQ7kNvwH0KQdl&_nc_oc=AdlUzdJdwa0iSMJWs6-MknByoJhqg6-7mmYUaHCbq7GL-UrMDA3LLvk6qicB3BVcZ6A&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&oh=03_Q7cD4QGZetetR3iJnQvv9PRNT0Qj2auJ9J1TtQgMn4Zd474g5Q&oe=69887858",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/609484622_1652422315726121_4019430930719457277_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_ohc=2xTH7Dfv8BIQ7kNvwFumWI1&_nc_oc=AdnTY_jiRcYLPrSLVrwr6ybreRgTDIiTynrTw5es_Fd7k0rYJzjwEft4wRgaKo6E3fw&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&oh=03_Q7cD4QFGwv_kafhOO18qUKnGT0KC4USCuLNHLgIUyGicE4473A&oe=69889D1F",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/608815978_1429705425163212_8508674826867730141_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=vf09ObS3e7cQ7kNvwGhDGxO&_nc_oc=AdntvidnxoNwztfblcjeFPgZ3COIsOJWBGt5svJ2zNv1A6o10au7GSEBPwTd22RF2aQ&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&oh=03_Q7cD4QHJPSt4nRwXvO2Wpz4c2LMAZ_cX2s3iKWEF7FWOu9p-tg&oe=6988741B",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/613867010_891869573240280_1769752868929167690_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=lA6IQCxg30cQ7kNvwGcj3-v&_nc_oc=AdkJsVNoiSGnQ89P7zoI-k7pzN3vZsEzsn0mrpqukaQK1yScqVlSlRzTsYfU2FRUDho&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&oh=03_Q7cD4QHrCsI1kkBnxu6CDIELoLU52ZRt2cEpuCEG_LyiH2YGjw&oe=69889800",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.15752-9/594390824_1486040555794212_4790623262768663546_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_ohc=4Uox5-4-IJsQ7kNvwGLYBGj&_nc_oc=AdnTPJFK_aRvlOw7u_g1Z8YcLeZY-f0wDh1l6-_31q0lZ6GNWa5jKtTo49C3mjW9dwo&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&oh=03_Q7cD4QGvxD2-H1HZfkMeNefM-oACZYUv0gdJLEG2ph35vAll_Q&oe=6988A325",
    ],
    likes_count: 342,
    reposts_and_quotes_count: 12,
    replies_count: 67,
    created_at: "30m ago",
    is_liked_by_auth: true,
  },
  {
    id: 1231,
    user: {
      id: 102,
      username: "ThePresentWriter",
      name: "The Present Writer",
      avatar_url:
        "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/431339708_979983020158373_7980601288300704641_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=g5EJAKjJDG0Q7kNvwFr2eXL&_nc_oc=AdlBWX4exd8ZrgNDSXQ65omzAzYNDlUS4ebYOUewskl6cWowHZjojPiRQgRSlzKK6tA&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=cg341Bzbi5CoTKc47t2SHQ&oh=00_AfoeK4lz2MhGh2ZFX9KxTtUZ476hfMvjqrpsB-r_TnwgGQ&oe=6966CE2A",
      verified: true,
      isFollowing: true,
    },
    content: `Hai lần đầu tiên tới Sài Gòn dạy cho mình rằng: Không có gì trên đời là tuyệt đối, là duy nhất, là một đi không trở lại. Nếu mình nỗ lực cố gắng, từng bước đi lên, làm hết khả năng của mình, cộng với một chút may mắn và ủng hộ từ những người thân yêu, mình sẽ đạt được điều mà mình mong muốn. 

Cảm ơn Sài Gòn vì bài học tuổi trẻ này nhé!`,
    media_urls: [
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/597075298_1420638689426135_8723927384913540251_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=hHm8XhxH4BUQ7kNvwF59A8A&_nc_oc=AdnDAQb3JM4eXzOaoxuVBA57E57OtLXRqK79MSF1vZHKnUvngXfofW624aWziReYP5c&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=po1T1XdwQjfSzAJeFR3rCQ&oh=00_Afo3OhA7kNw96rJLt6Sew1dZPXKSrbauih7ZD1dd_RaIJA&oe=6966E9E8",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/597554482_1420638652759472_2347356773546397577_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-hirFtaXMuwQ7kNvwFKjhOp&_nc_oc=AdkdRQ4QFiuODIQsocgwUv0T5b9o58DrZLGV5tNaAJGZgjqtk_TKGuPLtxmL5D5FAFg&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=JO5uCmobo9onQ2p8-DEc8w&oh=00_AfozngfHRrtOBpPMnCwDoNEb8H9hezkXxRm1lFmT-qAwJA&oe=6966F193",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/595232847_1420638709426133_8101040095090563629_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cZHZ45ImYXEQ7kNvwGvAFHo&_nc_oc=AdlXhaTJgU_RRsxCbrEPIQAa4rpj_uXAg0Z-CKnmclnUcnbEetEo7YeX5mnJf41JCXE&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=bRRb83coVDK-f45PKRuM1g&oh=00_Afpjb9z666VM19_Jf5Z3IPtjImStBVBvj513Pwt5anHscA&oe=6966E795",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/596798741_1420638809426123_302319853754569111_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=lT8sKhP5qloQ7kNvwFUKJNM&_nc_oc=AdmO5F_7Ge64QMhRVK0cTJuxTewHxtBwl-I-IYKImd9I3oZ3dc4G2watlxN88SqTyNs&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=cehofCDhmBvUQpgea8gTnQ&oh=00_AfotEc1YTDbK_o8Q-sI247vWazvtGF211XnsFlXs10TQKg&oe=6966ED66",
    ],
    likes_count: 1300,
    reposts_and_quotes_count: 25,
    replies_count: 19,
    created_at: "2026-01-03T03:17:18.000000Z",
    is_liked_by_auth: true,
  },
  {
    id: 100,
    user: {
      id: 108,
      username: "DogeDesigner",
      name: "@cb_doge",
      avatar_url:
        "https://pbs.twimg.com/profile_images/1498070100393754625/C2V-fbll_400x400.jpg",
      verified: true,
      isFollowing: true,
    },
    content:
      "BREAKING: xAI is investing more than $20 billion in Mississippi to build a massive data center, called 'MACROHARDRR' This 800,000 sqft facility will host the world’s largest supercomputer & mark the largest investment in state history.xAI is the fastest growing AI company.",
    media_urls: [],
    likes_count: 18945,
    reposts_and_quotes_count: 723,
    replies_count: 3456,
    created_at: "2026-01-08T03:17:18.000000Z",
    is_liked: false,
  },
  {
    id: 12351,
    user: {
      id: 102,
      username: "gilly.nah",
      name: "nguyen quynh anh",
      avatar_url:
        "https://instagram.fhan18-1.fna.fbcdn.net/v/t51.75761-15/485011407_18054813161471259_8388842248772277725_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=110&ig_cache_key=MzU4OTQ5ODkzOTcyMjU5MDI1Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=syW730curPMQ7kNvwFvPIvw&_nc_oc=Adl-qacLI77DujzDlPwViS_AhWuxELiXEBald5VW-XKQm-hoM6A12_vnNo_AadDjE2Q&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan18-1.fna&_nc_gid=MyJgRtbXoFRWnktwQXG_Ww&oh=00_Afo8VuXyQAnTaoIScLLuaTARcPlQfjeWsBzIcUA1jA5Vvg&oe=6966E298",
      isFollowing: true,
    },
    content: `xem xong “Chúng ta của 8 năm sau” thấy yêu Hà Nội quá nên quyết tâm sang bên TT Thành Công xem nó có giống như trong phim không.
may sao rủ được cạ cứng đi cùng`,
    media_urls: [
      "https://instagram.fhan18-1.fna.fbcdn.net/v/t51.82787-15/583145827_18080746646471259_617465477237827889_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=Mzc2NzA2NzgyMzMxNjI5MjEwNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkxMC5zZHIuQzMifQ%3D%3D&_nc_ohc=rFOVlxZNUAMQ7kNvwErc6z3&_nc_oc=AdngCXscO-zI9dfYmxisWI3PPGWLC1F_5h-qSSdftPij_4bK71hLPOtr98Ubm4RabqM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan18-1.fna&_nc_gid=MyJgRtbXoFRWnktwQXG_Ww&oh=00_AfpjyB2LpMarg-b0ouHmerMJI4Ku7ciOWGLIaozdJAo_1Q&oe=6966C1E9",
      "https://instagram.fhan18-1.fna.fbcdn.net/v/t51.82787-15/581097436_18080746655471259_3911729327776037949_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=106&ig_cache_key=Mzc2NzA2NzgyMzQ0MjE1NzIwNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkxMC5zZHIuQzMifQ%3D%3D&_nc_ohc=dH4dqFz_rasQ7kNvwHJophr&_nc_oc=AdnGW6Ikr3gsxyZL6hRTnrYQ-iRVypk_lk9YFJXTHd83DgXyzToJg78d8brFiINH9XQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan18-1.fna&_nc_gid=MyJgRtbXoFRWnktwQXG_Ww&oh=00_AfqB_RcJg___85JYclH5arhBon7Zd85EnQCs_DhFwqDxtA&oe=6966DAE7",
      "https://instagram.fhan18-1.fna.fbcdn.net/v/t51.82787-15/583197128_18080746664471259_5463650762918122673_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=110&ig_cache_key=Mzc2NzA2NzgyMzMyNDY4MzEyMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkxMC5zZHIuQzMifQ%3D%3D&_nc_ohc=fUSJ8GrCRLkQ7kNvwE9a-Iw&_nc_oc=AdlSG79fIrOu2orHJZPrlmoT1ZPWPOnK3ryWcZCSv1Ok7eJslj1LzWW97iehwcSpWbM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan18-1.fna&_nc_gid=MyJgRtbXoFRWnktwQXG_Ww&oh=00_Afod9GjZjZvCtOfiQ7AU3olGG_1PHbOFeaPO46sTRFFvCQ&oe=6966D813",
      "https://instagram.fhan18-1.fna.fbcdn.net/v/t51.82787-15/583705172_18080746682471259_599856935436099776_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=105&ig_cache_key=Mzc2NzA2NzgyMzYyNjY3NzMxOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkxMC5zZHIuQzMifQ%3D%3D&_nc_ohc=CnR2tJpsvZYQ7kNvwGvrKB7&_nc_oc=AdlX1lpt0Ly97Alipl05V9___Zpv8fJ6xnIhLYtukSu7KvgAZMf-IeArpMCeHnAv4-c&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan18-1.fna&_nc_gid=MyJgRtbXoFRWnktwQXG_Ww&oh=00_AfpFP6GR_DDnDDJ8vz01WAUEcacb70pUzrnpLtQQK1Awew&oe=6966F45F",
      "https://instagram.fhan18-1.fna.fbcdn.net/v/t51.82787-15/582870855_18080746691471259_467208734127455070_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=101&ig_cache_key=Mzc2NzA2NzgyMzMyNDY3Njk5MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkxMC5zZHIuQzMifQ%3D%3D&_nc_ohc=pHcbVJeLA_0Q7kNvwEx0cqM&_nc_oc=AdkbyUPiOqyFLKLrbFPDj36Foh0EM7hTrJjUSgiPZKtWx2ZWM6gH_-f8IN-sgRXy_G4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan18-1.fna&_nc_gid=MyJgRtbXoFRWnktwQXG_Ww&oh=00_Afq53DsxiL3U01iLj9B1adlhQsYqYB_xcSnC9EGb-eEe_w&oe=6966C715",
    ],
    likes_count: 189,
    reposts_and_quotes_count: 4,
    replies_count: 26,
    created_at: "2025-12-05T03:17:18.000000Z",
    is_liked_by_auth: true,
  },
  {
    id: 102,
    user: {
      id: 102,
      username: "j97",
      name: "J97",
      avatar_url:
        "https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/1/20/ngan-ngam-thay-ca-si-jack-j97-72911.jpg?width=0&s=OQaz1tZ-7uFLA8UTXffWFQ",
      verified: true,
      isFollowing: true,
    },
    content:
      "Lào công tử xin cảm ơn tình cảm của Hà Nội, hẹn gặp lại và mong mọi người thật nhiều sức khỏe, những điều may mắn …",
    media_urls: [
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/564802361_1391135545916783_2163136307293540918_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=YzDVSqUuXjoQ7kNvwGOH8RW&_nc_oc=AdnVaNIxhXcl7JIHbNL3Q2FgSzZ2qUCwKAm3Bg5YxQHd_qMk2Fp-UAJXXnl8hAgqjHQ&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=ti3NVk415SCmS0ypKsOPuQ&oh=00_AfpmTPOfLNKi4QswR1ZsMCLZqh7oJSzCFr-8taAGfwcAQg&oe=6966CAFC",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/565306875_1391135615916776_8520132962845346660_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BJPhTENXN4YQ7kNvwGjZUm6&_nc_oc=AdlPxVtfK4LGB7XwhEo10MfmYK2_i1B5L1-85PKvWH6EWHCsqsBFe1ktirCn_aWmTTw&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=oc4Bpq4ZLxYxs-IeVBDyew&oh=00_AfqpPV2eaiONt8C2RCeogrhtbgqjz_aybZRR_03C8X1foA&oe=6966E05C",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/561341994_1391135589250112_928078359846137243_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xP9NLS-5kF8Q7kNvwHeS2Xz&_nc_oc=AdnlWjEEtub7XPAVxHE_yJQRNb-StmtSmykss-4Cw37KdZSqQQivkEUrQx49nnsQN50&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=oEBx4B8nB7X4ND_QONT62w&oh=00_AfpbSPvmsrrZaJZFEA-5jg1tMpXa_auXB7nQ9pwmP6ThqQ&oe=6966F4F5",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/561249153_1391135555916782_4513158517439930054_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=m-ASePaKzrIQ7kNvwErqoUE&_nc_oc=Adka_zZtzgeqNsw9I9kvwQ5Dc9fRN3vw4NDhB4HVrecaUEOhXVIfRavkuChPDQXfl_s&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=7RKsI8x2gYds9p7WPeKaVg&oh=00_AfpYwna_sTlbCUyAcAxb6tV7pHalVkrUwow6L9RixnT70g&oe=6966DACC",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/562364319_1391135575916780_7626419104961249322_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=pJcKIyY5jVwQ7kNvwF6L7YM&_nc_oc=Admawv75wVc05XhPMVj3Y0WuW1m6jhS4Fy1nNe6m2sAGdutV0jm60Q0lx9tE1nZPu0A&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=1Ut4zFQ-eZ_TcbfS2F8RpQ&oh=00_AfoQKgnX0T-SujI0frI4mE1iT-Uylch290cnqluPFQ0rWg&oe=6966DCBF",
    ],
    likes_count: 30000,
    reposts_and_quotes_count: 600,
    replies_count: 1800,
    created_at: "5h ago",
    is_liked_by_auth: true,
  },
  {
    id: 2569,
    user: {
      id: 102,
      username: "sontungmtp",
      name: "Sơn Tùng M-TP 💋",
      avatar_url:
        "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      verified: true,
      isFollowing: true,
    },
    content: `Lần đầu tiên trong đời được đi xe buýt 2 tầnggggg
😌
Lớ ngớ thế nào lại vớ được 12 anh đại sứ Modern chình ình cái mặt trên xe nữaaaaa 
😚
Nó phải gọi là … BÓC TRÚNG SÍT RỊTTTTTTTTTTTTT 🤫`,
    media_urls: [
      "https://scontent.fhan12-1.fna.fbcdn.net/v/t39.30808-6/598984777_1436551717827217_3423448391986974846_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=cPeZeNrPPjIQ7kNvwE6zXdT&_nc_oc=AdlyyrWWwAjJEVvOH9RtaalEDkGvXKAVvWZzl6iNWGJ7tHO2NHztu0Ua5dub8BZQXDA&_nc_zt=23&_nc_ht=scontent.fhan12-1.fna&_nc_gid=n_qQshq1i-n7J88iKRPkyg&oh=00_AfpnveXlQoJlQsuyKJP3X_OF-BfkVSXBcn0b4GL63XVn8w&oe=6966BD0A",
      "https://scontent.fhan12-1.fna.fbcdn.net/v/t39.30808-6/600320984_1436551787827210_5135817046382819096_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9rjPkA0kCbgQ7kNvwHrWTp3&_nc_oc=Adm5A1HCHLZd1zlkdF6zVF-O3op6OU6ZHX7909hI7jR3ZcXgYxDitu-ufcOOqr8FE9E&_nc_zt=23&_nc_ht=scontent.fhan12-1.fna&_nc_gid=IRBcvFMxzUEATimmbnXjWA&oh=00_AfpcGCHl1ZSuwGeXGMT-9VHlfZkFL2JSOqhy1TsO84-_tw&oe=6966917B",
      "https://scontent.fhan12-1.fna.fbcdn.net/v/t39.30808-6/600325813_1436551811160541_7543771910930450051_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=dERrdit1W48Q7kNvwGsQKto&_nc_oc=AdmxqkcLgqIOwhXdpSWRdMioHMoS8l1VKBqR913IeCPrOB5X9mxj2i_hw-FXjlnOvUo&_nc_zt=23&_nc_ht=scontent.fhan12-1.fna&_nc_gid=icukDKRLzD-ihH6EahgCHg&oh=00_AfqTWqYHeWM-eigP_An7ZR84Z2n-jg1WoQorv-F74Dwcng&oe=69669B22",
      "https://scontent.fhan12-1.fna.fbcdn.net/v/t39.30808-6/600212561_1436551741160548_1630051568662297165_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IFK5cmoVFPIQ7kNvwFgcNwP&_nc_oc=Adk2itziV93lwDVuCNgvz8KDYyAJe2WJPl4q2KdaZCgdrpUUOzb-vYRBfm3EABIp7Rk&_nc_zt=23&_nc_ht=scontent.fhan12-1.fna&_nc_gid=T9XDhTqFb6Jv35VuTOwycQ&oh=00_AfoEat0-KQ6SAJ64x7-DZzeOO7ZkZGFo_MllhtgpipPhpw&oe=6966A97E",
      "https://scontent.fhan12-1.fna.fbcdn.net/v/t39.30808-6/598296826_1436551837827205_755241436323708756_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=wBsMfnVErZ8Q7kNvwHK3sOQ&_nc_oc=AdlZm8fSLmuwnfgcVuUsx9BWt9grf_A1r-JQVrpAUGJ7eZL-hYgSUb38v35nWCtThvY&_nc_zt=23&_nc_ht=scontent.fhan12-1.fna&_nc_gid=ODyI6ToXb9yb3OsWdUhxIQ&oh=00_Afr6AqcMFsF7sp4AP4Ncqm7B2APusVJ1RBuFpIVTkaAbbQ&oe=6966AE79",
      "https://scontent.fhan12-1.fna.fbcdn.net/v/t39.30808-6/598685770_1436551807827208_5861125152373456818_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Xhq4hOdCY38Q7kNvwEOtA1j&_nc_oc=AdkwUFEXS3NZE5RXwDQ6hCkJJ3PgHxQ5hcJEefjjx-JvzR-TGsSrby_raAVZAfh_CIw&_nc_zt=23&_nc_ht=scontent.fhan12-1.fna&_nc_gid=YkRu93MCUqLxonvduZKlbw&oh=00_Afow1nQdWm5ToOCh8PQUhik3LnkghcnRV2SVfWKqhm-tsA&oe=6966B35E",
      "https://scontent.fhan12-1.fna.fbcdn.net/v/t39.30808-6/600145977_1436551897827199_2513972197701953106_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=OpIio51nmLIQ7kNvwEJlZTE&_nc_oc=AdlVORiewFJOkyrbMmxjYSYEiklNXQLfxvLa4Cm2fsEfaAjm-Gz2J6d0Su9n4fXDOrY&_nc_zt=23&_nc_ht=scontent.fhan12-1.fna&_nc_gid=NwuZbxQO5McB4LLVwbFvug&oh=00_AfqGVHd3OpXUmETwX7UpzhM9phTYXeWiQmaPtfv5Bp0v0g&oe=6966A6A0",
    ],
    likes_count: 58653,
    reposts_and_quotes_count: 5463,
    replies_count: 7892,
    created_at: "5h ago",
    is_liked_by_auth: true,
  },
  {
    id: 9,
    user: {
      id: 109,
      username: "elonmusk",
      name: "Elon Musk",
      avatar_url:
        "https://pbs.twimg.com/profile_images/2008546467615580160/57KcqsTA_400x400.jpg",
      verified: true,
      isFollowing: true,
    },
    content:
      "Ready for that cage match yet, Zuck? 🥊 Still waiting. Anytime, anywhere. Let's settle this like real men. No excuses!",
    likes_count: 456789,
    reposts_and_quotes_count: 15234,
    replies_count: 23456,
    created_at: "1h ago",
    is_liked_by_auth: true,
  },
  {
    id: 8,
    user: {
      id: 108,
      username: "zuck",
      name: "Mark Zuckerberg",
      avatar_url:
        "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/549396203_10116914317863211_2996843027695932475_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=08TEsBh9w0sQ7kNvwFtHMb7&_nc_oc=AdmnWrS-Xb8rGB3_sPv07dEah26o8mQIWEQLScvj4pkCKWsNmBz09o34hcAqniVjLBA&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=J2T9XmCLIDx-l7S1mbLN3A&oh=00_AfqAe6ZygYdue8he4-PYcSMS2DF9NCzMul-EN8hLheqwdw&oe=69668914",
      verified: true,
      isFollowing: true,
    },
    content: "It's been a year!",
    media_urls: [
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/607143828_10117193155535281_857738908976341292_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=V7EUClpmfngQ7kNvwF649AS&_nc_oc=AdkSBUd1J7GuNvZ7_BoUctpDf9qHkR5irL8bKVa1PJ-eCu28Hjw0yPqdoy6nUA9-Yfo&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=m9ssrWD1idX4Ciq90jZG8g&oh=00_Afo3OH1e5C2mQODQcfB6-uHtxf3c34bGLT1FavT805cngg&oe=69668506",
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/605753247_10117193155545261_4079878770191241980_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Xl4A-x2HnXEQ7kNvwGZnw_q&_nc_oc=AdmSJTrDQLQn8TWMMGFacSvma0c1MxT6UGa5uuLPOc7iFQiNpPccVcYtjrhfDV6VOZQ&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=yML89jFcmfXX4VrZEAfarA&oh=00_Afph1woONugcv8FClUtBgrXpktFKoHbzIqshK4SYAV1mZg&oe=69667927",
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/605535918_10117193155585181_6519629786245588559_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=s-bRVmNKc7sQ7kNvwG4T-Lp&_nc_oc=Adm8VgVHP4zsz9TL0j1kj0wzYNh-TZig3OL4AaHcn0v5YhC5LDuNuSmDsmKr9M5TAWc&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=wFNNzSLBCOVUaLdoIX16eA&oh=00_AfoQeRP0lfHHxATbFQd9aDpGf_E1bhpJ5deS2jbLQ_4IhA&oe=69667D01",
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/605572486_10117193155729891_2571595701808142445_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=6pLscnOnoUoQ7kNvwEPZ45D&_nc_oc=AdnjdtvRnxLTuAq6wpb-AaFQLXTpOeHz_3nf9FJxvtlgYeirU9EGD1Zt-Mkm15XjH7o&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=nWKsQzF9IjtPtGxkNhb28A&oh=00_AfpwJUFbTKe_2u6kB2olNaPBbEEZbAVUv3-_hnF1-dhKVQ&oe=696699FE",
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/607636527_10117193155969411_1373042340575521808_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=7VyXEEfgNWcQ7kNvwFNK4Is&_nc_oc=AdkeIZEekyklkyRCngWyipisiivcLVvepf3vfw69_vAzaZx3kZW_ELX084duwwJvJc4&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=Wpl302alFI16UIugA1eKDQ&oh=00_AfpCeSnZuOhEduhKopbirJd5V9wfcCokumjmwS7nDQJ1Hw&oe=69666BAE",
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/606351129_10117193156228891_6076421798090189753_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=SbeTJb8irikQ7kNvwHNdDNA&_nc_oc=AdmvduTVchHlp7k4XDjwx6bBGmZ8wjsgP7FmGTO_2v07wAWEpXuk7knqzOQUhdkxWSQ&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=Ua_gus-Zj7v4yppM1LapRA&oh=00_AfqB7puMbVFzqbJdO6tGqYy7cSQehi4e7KHFEoEIgfIq3w&oe=69669642",
    ],
    likes_count: 18945,
    reposts_and_quotes_count: 723,
    replies_count: 3456,
    created_at: "4h ago",
    is_liked: false,
  },
  {
    id: 1800,
    user: {
      id: 102,
      username: "sontungmtp",
      name: "Sơn Tùng M-TP 💋",
      avatar_url:
        "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      verified: true,
      isFollowing: true,
    },
    content:
      "Chẳng hiểu sao họ gọi em là thiếu nữ.Mà sự thật em thiếu một nam nhân",
    media_urls: [
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/587805017_18545566837042044_2897950443748016094_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=Mzc4NjUwMzMwMzU5NDE3ODM0OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5NS5zZHIuQzMifQ%3D%3D&_nc_ohc=6R64sZFmu8QQ7kNvwFln1mb&_nc_oc=Adny-msrl0mc3RWh9bVMJgZtpz-_yypdm_Ke6pDgknyFP6-RI5dIuPK0gPQ6sb5tpHE&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=aBeDni0xvtgr2i8SKEVkAA&oh=00_AfrfHdQ8_vaO8xO6HnKk9XChz_-YAZsXPgWgCOtgR3Wppw&oe=69667FC1",
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/591169815_18545566855042044_7161084111520503781_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=108&ig_cache_key=Mzc4NjUwMzMwMzQxNzk2NzY0MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5NS5zZHIuQzMifQ%3D%3D&_nc_ohc=qcYH7EPW_GoQ7kNvwECe5yL&_nc_oc=Adlqik3PWI4Leznq_MoROwBghhfZQLi3RNwesHsAC0wta1d1cLK5d-DZjQoew4PkXEE&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=aBeDni0xvtgr2i8SKEVkAA&oh=00_AfqS7VPkiBUqiYvaQDfaV1UhF79Q4AbgSZJJGDJ42Pb49Q&oe=69666B27",
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/588635834_18545566873042044_941038866361006949_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=105&ig_cache_key=Mzc4NjUwMzMwMzU5NDEyNjU5Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5NS5zZHIuQzMifQ%3D%3D&_nc_ohc=gPUlibQHvS0Q7kNvwFkH8Ui&_nc_oc=AdlVjaZtWF9lHObxT8lcSVRmPdmchhqEkTLqtQaLC2Q9m1chO9vSLTQu1j4oyIW_dn0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=aBeDni0xvtgr2i8SKEVkAA&oh=00_Afp_cSi3EMmNEhLpdtTUTEZ1CrMA72Fq_z0fBbfAxF64tw&oe=69667A4D",
    ],
    likes_count: 295000,
    reposts_and_quotes_count: 1600,
    replies_count: 1900,
    created_at: "5h ago",
    is_liked_by_auth: true,
  },
  {
    id: 18,
    user: {
      id: 102,
      username: "sontungmtp",
      name: "Sơn Tùng M-TP 💋",
      avatar_url:
        "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      verified: true,
      isFollowing: true,
    },
    content:
      "Nhiều ông bà đến tận giờ này vẫn còn thắc mắc … Sao ông Tùng hứa đi chạy bộ HỒ GƯƠM mà không thấy đâuuu … 🙂Đây … đây này … Đã muốn cất giấu kí ức này đi mà cứ bắt người ta phải moi lên mới chịuuuu … 🙃Có biết hôm đấy chạy bộ một mình quanh hồ lạnh lẽo thế nào khôngggg 🥲🥲🥲",
    media_urls: [
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/583535882_18541006435042044_7868208800947324188_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=100&ig_cache_key=Mzc2NjkyMDgyODIyODM3MzM3Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5NS5zZHIuQzMifQ%3D%3D&_nc_ohc=qYfg57qzB6sQ7kNvwH4iLYS&_nc_oc=AdmHiNEQbv3ruH1HxeTQV-Dt0K-ROPDJLISHx4oAJcV5XN7ZE3E35jk0FPUwjb6GKmQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=qNoLOBfVycuQmYKBwoE-Ew&oh=00_Afosy4FdXit74BIN1kF0C8tT4hyQm-27DAmdgBofz3-hZg&oe=69668874",
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/581435984_18541006444042044_2102571369351295835_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=109&ig_cache_key=Mzc2NjkyMDgyODE3ODAyOTk2Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5NS5zZHIuQzMifQ%3D%3D&_nc_ohc=Ec3iH89s78YQ7kNvwHwwHvk&_nc_oc=Adm2aBPd0mV41asqCnPIRTICesId4h5hitzO08iLJ6BMYzf8E15MOrUPxSzrYS1dkl8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=qNoLOBfVycuQmYKBwoE-Ew&oh=00_AfqHukTb5dPEAJY526KituDUlti_4USXOos9cbWZX-zgLw&oe=69667047",
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/581725970_18541006453042044_1118421191812529200_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=Mzc2NjkyMDgyODE3ODA1MTA0Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5NS5zZHIuQzMifQ%3D%3D&_nc_ohc=OijlxBiEUMwQ7kNvwE86RAI&_nc_oc=Admj5r8lNQPURZTtx8bOTo8ogv8-0-A3D1HU0mOnpm-SkdPr_WynhSHVtZ0hsgfWz-0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=qNoLOBfVycuQmYKBwoE-Ew&oh=00_AfoTQayyX2YtiMQQrxS8XBE0Iwik_kh2r1ZFyuDd22K4jA&oe=69669393",
    ],
    likes_count: 175000,
    reposts_and_quotes_count: 2500,
    replies_count: 1254,
    created_at: "5h ago",
    is_liked_by_auth: true,
  },
  {
    id: 10,
    user: {
      id: 102,
      username: "j97",
      name: "J97",
      avatar_url:
        "https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/1/20/ngan-ngam-thay-ca-si-jack-j97-72911.jpg?width=0&s=OQaz1tZ-7uFLA8UTXffWFQ",
      verified: true,
      isFollowing: true,
    },
    content: "Này gió ơi, đừng vội vàng, lắng nghe được không?",
    media_urls: [
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/565130803_1391985292498475_6043639841704060327_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=B0aWWhc-zbsQ7kNvwESurIQ&_nc_oc=AdlKeJxpT_hK0or8FX06A9qKIKf9xQpwm_1-6xrysDL_DvhkKOhgWhvJGM2RLGcin10&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=6QqCmzPkP5Z-d9jddrm4Pg&oh=00_Afo1F_CUzt5gbpH-6JIcdHnGoakAKYWbKOicYvL9GcnkZw&oe=6966CE91",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/564064404_1391985405831797_4175982739405730250_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=zbtLENQ-4AMQ7kNvwGQNYw-&_nc_oc=AdmBcCMDRrKBN_PwAhtxGQNBz4WL0du9-4PkM5z2dioBoCuM8x6iNh2_w8v_WtoIFnE&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=bcFHg2BPs_hXi2u-FO_3TQ&oh=00_Afo4VE3NNmwky4w9QfzxTtQ7_g-3XbtA0fdkHDmJ5daxSg&oe=6966C67F",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/564611207_1391985315831806_912513560557787120_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hb4kc7vY3mgQ7kNvwEyJQ6_&_nc_oc=AdlU9-ovMXrAM9V1ECLycD8JYvulctXAPmTtDy9ZJiajsFI56DxIeV5vauDHVA95bEE&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=ubKIE-DX_HA3uqgSF8lhUw&oh=00_Afp6HZbepYrTKVkh4iNEEwxsETP-JKUEz-Q7JeJ7NJ6u-A&oe=6966F419",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/559180889_1391985399165131_1091933022511941871_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=rkT6pUAg4BIQ7kNvwFXiouP&_nc_oc=AdmWXvhEFE20Ze3GsNUzfSoVgb8zXR9RreFziYp_mT5Gw6A7ITI_KkgVxL4NF5gLLNo&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=c9_pjyS8u2qLxDV4M7Kl7g&oh=00_AfpAwcndwOq54rHOwFxSMZVsp6ifrbWZ10N0fTPSahdcUg&oe=6966E231",
      "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/565750468_1391985432498461_2860272309386303870_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=NFyPTGNIgg4Q7kNvwFg8bgq&_nc_oc=Adm2rxyEyB2jk9jFi9uf8PANw51UemtmiT9P14cmCOfGLqzkdL9TMBtQQ_u1pV2Tj5I&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=yR6CU-LPuboCMmC2FlTUaA&oh=00_Afr_P4kXdafK7X42auGLFxVT4zKbhCB_1bNB7adb68cR3w&oe=6966E9DA",
    ],
    likes_count: 3247,
    reposts_and_quotes_count: 89,
    replies_count: 456,
    created_at: "5h ago",
    is_liked_by_auth: true,
  },
  {
    id: 20,
    user: {
      id: 102,
      username: "sontungmtp",
      name: "Sơn Tùng M-TP 💋",
      avatar_url:
        "https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg",
      verified: true,
      isFollowing: true,
    },
    content:
      "Hôm nay có người nắm tay trong tàu, còn tôi nắm… thanh vịn và nỗi cô đơn 🙂Không sao … Tôi ổn hôm mê ạ 🥲",
    media_urls: [
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/573816746_18538110040042044_5077681824760427552_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=Mzc1ODk2NzE3MTIyMjUzNTQzMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5OS5zZHIuQzMifQ%3D%3D&_nc_ohc=6YiznkXarKEQ7kNvwFw5lEl&_nc_oc=AdntNWz2HD00ccLKNV3ENbydDsaIX9if8OAZ0WJY8QlpbM7hL6n3zeoBof-x3hKcAWM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=aBeDni0xvtgr2i8SKEVkAA&oh=00_Afo7GkBn1cc2lzbEV01i1PceO5r_q1hgJ7SVMH6ORVAOpg&oe=696660E4",
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/573256861_18538110049042044_5209306352241962224_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=102&ig_cache_key=Mzc1ODk2NzE3MTIyMjUzMzczNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwNC5zZHIuQzMifQ%3D%3D&_nc_ohc=En6Xndk4phUQ7kNvwEj2qbN&_nc_oc=AdmGvahePLRfqge0bTq8UnY_Z4-SF8TBA7UmrIXbQvMEOqKdPOSI7U83RJ-bRopdME4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=aBeDni0xvtgr2i8SKEVkAA&oh=00_AfrWPl1O-bukOpdD7u8KAn5uGoeMn2s1YsklhW66UC8z5w&oe=69668FE7",
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/573149481_18538110058042044_361099006297395066_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=108&ig_cache_key=Mzc1ODk2NzE3MTM0ODMxNzg2MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwNC5zZHIuQzMifQ%3D%3D&_nc_ohc=8EorhQZVuGsQ7kNvwGnLO7o&_nc_oc=AdkhjwiR8bt91ceHmNpoMnmiIp13vM2lTpio7Pp6Fq8DQESPQ_wSZiv5Zo1FUQFwF-E&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=aBeDni0xvtgr2i8SKEVkAA&oh=00_AfqLH6DyPM9_COxVXF4C-szPCtvgsoa-3-rw64YmampPkA&oe=69669691",
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/572422775_18538110067042044_4566027708678000349_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=104&ig_cache_key=Mzc1ODk2NzE3MTUwNzY5MzcwMw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5OS5zZHIuQzMifQ%3D%3D&_nc_ohc=XZ_s_nUrCBAQ7kNvwHtsNO1&_nc_oc=AdnaD0Z6Ri4meQIs9ZahmZKQkTJP9OkPgK_QFz7MuySCEjrwAh_kRwpQjZl-HdoZ4TI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=aBeDni0xvtgr2i8SKEVkAA&oh=00_AfoFCI-g8kdW_vedaZXKhiWjXoLLItkBBDx2aiNssVJ6bw&oe=6966761D",
      "https://instagram.fhan19-1.fna.fbcdn.net/v/t51.82787-15/572911235_18538110076042044_4599486899891520278_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=Mzc1ODk2NzE3MTMzOTk3MDE5OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5OS5zZHIuQzMifQ%3D%3D&_nc_ohc=Uq3V8qHHEbgQ7kNvwGB9RaP&_nc_oc=AdmAjRfiGWirQoDiqh5squYeji2WXz7wTUfGfgFyNMr_pxk3eTgnGuyYJHyimn3XZ_s&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fhan19-1.fna&_nc_gid=aBeDni0xvtgr2i8SKEVkAA&oh=00_Afpc_rlifqCacmeLk5PpIcUhmbnanl2c1bx5BxgfB9YFuA&oe=69669526",
    ],
    likes_count: 58653,
    reposts_and_quotes_count: 5463,
    replies_count: 7892,
    created_at: "5h ago",
    is_liked_by_auth: true,
  },
  {
    id: 1000,
    user: {
      id: 102,
      username: "j97",
      name: "J97",
      avatar_url:
        "https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/1/20/ngan-ngam-thay-ca-si-jack-j97-72911.jpg?width=0&s=OQaz1tZ-7uFLA8UTXffWFQ",
      verified: true,
      isFollowing: true,
    },
    content: "những chuyến đi cuối năm ",
    media_urls: [
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/608980779_1450343203329350_8024623454936993880_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=U6o7svY9Vv4Q7kNvwHWewyk&_nc_oc=Adl9XcZXXJe-mxQMrmOVcS5mwcPYlAfW9yg3gInmsAzg0g3rATPpzMUJCxU7RCkCZE0&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=UxClzX1v4ykULjx5LoFBQQ&oh=00_Afp5lOFptW98K5idmMzwSqMRXlkMktd9v3PNmDVmhN2zeg&oe=696665E3",
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/606911618_1450343276662676_5551293605458156102_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=4FLlNuBOkt4Q7kNvwHxx9_R&_nc_oc=AdmYVHfBY6F-usw0Rz_Mnrj7mVVvGysLBoe8aPNLJz5l1XKP3NI8pqnTNsjV1QrIOcE&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=fsKWjGFO1i6Y_KSNs_9eWA&oh=00_AfqGJ1EINkvnFECW67D3F44oSigiEa4jHp9qVRMzRrHqzQ&oe=69668B9B",
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/607084634_1450343259996011_2250989238484732319_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=0GLih_AON2MQ7kNvwH7-gYh&_nc_oc=AdlIaVGRih4WIG88rUbL23vkcOdpbOrinnvXipFgwbFSY6VhehsTGXTPloxOhZOTyrw&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=iklLWXGcoCX55uv1jzub2Q&oh=00_Afq2854wsYc3u_BKQW0805yfHqf39TxlX-NaVv5tGMBhVg&oe=696671F1",
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/606810530_1450343213329349_1105215072825464542_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Y0CpoWzOcSwQ7kNvwFzfS8A&_nc_oc=AdnFO-4cqWnWPniex_VFUKKvtjXzAqNvIdwKVmmIkab0GJAsy1Cf5Ibut6L6awqGtK4&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=5bWvA7WFz0YRnUuvT0LR3Q&oh=00_Afpa-VFNrEgj99pNngQKnGFY_tciS4lngDKo45sl7Hbr0w&oe=69666D61",
      "https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/605523880_1450343293329341_2663147345940031068_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=tAo7chNj19cQ7kNvwEh8r-T&_nc_oc=Adn19eMC7ZanydX_8R96n8Wi_xFZBK34K72CrSGMa2m2Nu6HZaKNLcIoQI8_hUr5NbA&_nc_zt=23&_nc_ht=scontent.fhan19-1.fna&_nc_gid=CpXeeguoJjL8Vnw2a_IOMg&oh=00_AfoviTaOZedIgufs1auMqOG0KsZt8iXGlXieWsIqJFlYDA&oe=696665BF",
    ],
    likes_count: 38000,
    reposts_and_quotes_count: 507,
    replies_count: 1800,
    created_at: "5h ago",
    is_liked_by_auth: true,
  },
];

const FollowingFeed = () => {
  const currentUser = useCurrentUser();
  const isDeskTop = useIsDesktop();
  const isShowPadding = isDeskTop || !currentUser;

  return (
    <div
      className={`overflow-hidden bg-white pt-3 pb-14 ${isShowPadding && "pt-16"} dark:bg-[#181818]`}
    >
      {currentUser && <CreatePost />}

      <div className="bg-white dark:bg-[#181818]">
        {DEMO_POSTS.map((post) => (
          <div
            key={post.id}
            className="border-t border-gray-300 first-of-type:border-none dark:border-[#323030]"
          >
            <div className="flex max-w-[640px] flex-col items-start overflow-hidden bg-white px-4 py-3 dark:bg-[#181818]">
              <FeedItem post={post} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingFeed;
