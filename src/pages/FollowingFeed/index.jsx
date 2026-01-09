import { useCurrentUser } from "@/features/auth";

import CreatePost from "@/components/Posts/components/CreatePost";
import FeedItem from "@/components/Posts/FeedItem";
import { useIsDesktop } from "@/hooks";

// Dữ liệu demo
const DEMO_POSTS = [
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
    likes_count: 7569,
    reposts_and_quotes_count: 4897,
    replies_count: 1254,
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
  {
    id: 6,
    user: {
      id: 105,
      username: "minhquanvippro",
      bio: "Do you have that dream if one of your favourite artist  would collab  with another. today it finally happened🥰",
      name: "Quân Minh",
    },
    content:
      "I have been holding my tears back for a while, trying my best to stay strong after so much has happened in my life lately. I feel stuck and on the edge of giving up. I heard this, and it expressed my feelings so well that I burst into tears. It really touched me and made me feel understood. Thank you sincerely for this heartfelt piece.",
    media_urls: [
      "https://picsum.photos/600/400?random=5",
      "https://picsum.photos/600/400?random=6",
      "https://picsum.photos/600/400?random=7",
      "https://picsum.photos/600/400?random=8",
      "https://picsum.photos/600/400?random=9",
    ],
    likes_count: 173,
    reposts_and_quotes_count: 34,
    replies_count: 67,
    created_at: "1d ago",
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
