import { BLOGDATA } from "@/utils/constants";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

export const BlogPage = () => {
    
    const { id } = useParams();
    
    const blog = BLOGDATA.filter(blog => blog?._id == id)[0];

    return (
        <section className="flex p-10 inria-serif-regular justify-center items-center w-full h-screen mt-56">
            {parse(blog?.blogContent?.markup)};
        </section>
    );
};