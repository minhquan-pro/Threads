import { useCurrentUser } from "@/features/auth";

import CreatePost from "@/components/Posts/components/CreatePost";
import FeedItem from "@/components/Posts/FeedItem";
import { useIsDesktop } from "@/hooks";

// Dữ liệu demo
const DEMO_POSTS = [
  {
    id: 100,
    user: {
      id: 108,
      username: "DogeDesigner",
      name: "@cb_doge",
      avatar_url:
        "https://pbs.twimg.com/profile_images/1498070100393754625/C2V-fbll_400x400.jpg",
      verified: true,
    },
    content:
      "BREAKING: xAI is investing more than $20 billion in Mississippi to build a massive data center, called 'MACROHARDRR' This 800,000 sqft facility will host the world’s largest supercomputer & mark the largest investment in state history.xAI is the fastest growing AI company.",
    media_urls: [],
    likes_count: 18945,
    reposts_and_quotes_count: 723,
    replies_count: 3456,
    created_at: "4h ago",
    is_liked: false,
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
    id: 4,
    user: {
      id: 104,
      username: "tim_cook",
      name: "Tim Cook",
      avatar: "https://i.pravatar.cc/150?img=14",
      verified: true,
    },
    content:
      "Great meeting with our teams today. Proud of the incredible work happening across the company. Our commitment to innovation and privacy remains stronger than ever. 🍎",
    likes_count: 12453,
    reposts_and_quotes_count: 567,
    replies_count: 1203,
    created_at: "6h ago",
    is_liked: true,
  },
  {
    id: 7,
    user: {
      id: 107,
      username: "mary_barra",
      name: "Mary Barra",
      avatar: "https://i.pravatar.cc/150?img=20",
      verified: true,
    },
    content:
      "Sustainability and innovation go hand in hand. Proud of our progress toward an all-electric future. Together, we're driving change that matters. 🚗⚡",
    media_urls: [],
    likes_count: 6789,
    reposts_and_quotes_count: 198,
    replies_count: 534,
    created_at: "12h ago",
    is_liked: false,
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
    },
    content:
      "Ready for that cage match yet, Zuck? 🥊 Still waiting. Anytime, anywhere. Let's settle this like real men. No excuses!",
    media_urls: [],
    likes_count: 456789,
    reposts_and_quotes_count: 15234,
    replies_count: 23456,
    created_at: "1h ago",
    is_liked: true,
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
    id: 6,
    user: {
      id: 106,
      username: "jensen_huang",
      name: "Jensen Huang",
      avatar: "https://i.pravatar.cc/150?img=16",
      verified: true,
    },
    content:
      "The future of computing is accelerated. Thrilled to see developers around the world building incredible applications with our platform. This is just the beginning! 🎮💚",
    media_urls: [],
    likes_count: 9234,
    reposts_and_quotes_count: 312,
    replies_count: 756,
    created_at: "8h ago",
    is_liked: true,
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
    },
    content: "Này gió ơi, đừng vội vàng, lắng nghe được không?",
    media_urls: [
      "https://trixie.com.vn/media/images/article/54801627/jack.jpeg",
      "https://thanhnien.mediacdn.vn/Uploaded/haoph/2021_10_21/jack-va-thien-an-5805.jpeg",
      "https://nguonluc.com.vn/uploads/images/2025/01/26/jack-1-1737903814.jpg",
      "https://photo.znews.vn/w660/Uploaded/wpdhnwhnw/2025_05_30/495032291_1260938672269805_4994651888818453651_n.jpg",
      "https://gocnhobecon.com/wp-content/uploads/2025/09/jack-97-meme.webp",
    ],
    likes_count: 3247,
    reposts_and_quotes_count: 89,
    replies_count: 456,
    created_at: "5h ago",
    is_liked_by_auth: true,
  },
  {
    id: 3,
    user: {
      id: 103,
      username: "satya_nadella",
      name: "Satya Nadella",
      avatar: "https://i.pravatar.cc/150?img=13",
      verified: true,
    },
    content:
      "Innovation distinguishes between a leader and a follower. Excited about what we're building for the future of technology. The best is yet to come! 🚀",
    media_urls: [],
    likes_count: 8942,
    reposts_and_quotes_count: 234,
    replies_count: 891,
    created_at: "3h ago",
    is_liked: false,
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
