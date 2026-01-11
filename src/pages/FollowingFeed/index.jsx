import { useCurrentUser } from "@/features/auth";

import FeedItem from "@/components/Posts/FeedItem";
import { useIsDesktop } from "@/hooks";

// DemoVideo
import videoDemo3 from "/videosDemo/video-3.mp4";
import videoDemo5 from "/videosDemo/video-5.mp4";
import videoDemo6 from "/videosDemo/video-6.mp4";

// Dữ liệu demo
const DEMO_POSTS = [
  {
    id: 26589,
    user: {
      id: 116,
      username: "ygt1016",
      name: "Quý Đặng",
      avatar_url:
        "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/612455415_122283125516036290_1325764938759042572_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_ohc=JG6QAg7_9SQQ7kNvwFWGKny&_nc_oc=AdkvHw1fune71ciWZo6_B9DYec38X0eEQ-K9r3gzdEMGpgEwfYVYNcG7JIm4i6DjpIA&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=hFPrwyO2p1FpWCLq9nJCaw&oh=00_AfpqbX44186FQ6ZnU6JMcXrfflG-vthVB_skkQ85JUlMYw&oe=696825F0",
      isFollowing: true,
      verified: true,
    },
    content: "大阪必吃美乃滋大阪燒！店員每個都好會噴！",
    media_urls: [videoDemo5, videoDemo6],
    likes_count: 2500,
    reposts_and_quotes_count: 50,
    replies_count: 37,
    created_at: "4h ago",
    is_liked_by_auth: true,
  },
  {
    id: 25789,
    user: {
      id: 116,
      username: "quydang2905",
      name: "Quý Đặng",
      avatar_url:
        "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/292600939_115228927905082_8122933722667759685_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=vM9lr8VO4noQ7kNvwE_4-Rq&_nc_oc=AdnjBKBtTOymDBNdZctEw56tBCNddKAjvBSQesLj9dIvPa7uHzYnox2qQM6QvnxbE64&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=IS_iobiOuneJ6YTL06_Zgg&oh=00_AfppcwB0xDRJ3_l3vakZXNix6d8sb7R0aGHcfpNAyFJnmQ&oe=6967AE9A",
      isFollowing: true,
      bio: `HUE - TOKYO
Mindset – Healing – Growth`,
    },
    content: `Nghe này...
Chỉ có duy nhất 1 con đường
dẫn bạn tới TỰ DO,
Chính là HỌC TẶP!`,
    media_urls: [videoDemo3],
    likes_count: 160,
    reposts_and_quotes_count: 14,
    replies_count: 23,
    created_at: "4h ago",
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
];

const FollowingFeed = () => {
  const currentUser = useCurrentUser();
  const isDeskTop = useIsDesktop();
  const isShowPadding = isDeskTop || !currentUser;

  return (
    <div
      className={`overflow-hidden bg-white pt-3 pb-14 ${isShowPadding && "pt-16"} dark:bg-[#181818]`}
    >
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
