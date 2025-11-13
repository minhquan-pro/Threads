import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const CreatePost = () => {
  return (
    <div className="flex items-center justify-between gap-2 border-b p-4">
      <div className="flex w-full items-center">
        <Avatar>
          <AvatarImage
            src="https://scontent.cdninstagram.com/v/t51.75761-19/491498645_17844893745466395_895862236767368793_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=104&ccb=7-5&_nc_sid=07cfa3&_nc_ohc=lAp4D7PJnSMQ7kNvwFpAiiX&_nc_oc=AdkxPvLsESoAh1OaIZIz_oqvxjCavS0_Si0YRFxW9D60yC7lRLV8Cp7s0GnKQXH8NjE&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=gwORtzYbpStfSSap9y9z5Q&oh=00_AfjAARlurQiprwZ8q-Xb383ZD2mQfjp5gntnezoK_8Fd9g&oe=691AEA04"
            className="h-10 w-10 rounded-full border p-0.5"
          />
        </Avatar>
        <div className="text-md w-full rounded-md p-2 text-gray-400">
          Có gì mới?
        </div>
      </div>
      <Button variant="outline">Đăng</Button>
    </div>
  );
};
export default CreatePost;
