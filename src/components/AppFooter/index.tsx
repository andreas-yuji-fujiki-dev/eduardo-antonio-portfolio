import SocialButtons from "../SocialButtons";
import SocialButtonsPathsJson from "@/constants/SocialButtonsPaths.json";

export default function AppFooter(){
    const currentYear = new Date().getFullYear();
    const githubLink = SocialButtonsPathsJson[0].path;

    return (
        <footer
            className={`
                flex
                justify-around
                py-10
                border-t-1
            `}
        >
            <span
                className={`

                `}
            >
                <a href={ githubLink }>
                    &lt;/&gt; .edward
                </a>
            </span>

            <SocialButtons />

            <span
                className={`
                    
                `}
            >
                &copy;{ currentYear }
            </span>
        </footer>
    );
};