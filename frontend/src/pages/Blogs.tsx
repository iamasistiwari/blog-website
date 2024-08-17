import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"





export const Blog= ()  =>{
    return <div className="">
        <div>
            <Appbar />
        </div>
        <div className="mt-16  ml-48">
            <div className=" ">
                <BlogCard id={1} authorName="Peter V" title="Long COVID Looks Like Acute Infection in the Brain" 
                description="No need to create a fancy and modern website with hundreds of pages to make money online. -Making money online is the dream for man" publishedDate="Dec 3, 2023"/>
            </div>
            <div>
                <BlogCard id={2} authorName="Ashish" title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"
                description="le-Page Website Makes $5,000 a Month with Affiliate Marketing How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing" publishedDate="13 Jan 2023"/>
            </div>
            {/* <div>
                <BlogCard authorName="Ashish" title="How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"
                description="No need to create a fancy and modern website with hundreds of pages to make money online. -Making money online is the dream for man How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing" publishedDate="13 Jan 2023"/>
            </div> */}
        </div>
    </div>
}