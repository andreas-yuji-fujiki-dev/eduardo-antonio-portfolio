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
                *:opacity-65
                *:hover:opacity-100
                border-t-1
                text-2xl
                mt-2
            `}
        >
            <span
                className={`
                    hover:opacity-100
                    text-2xl
                `}
            >
                <a href={ githubLink }>
                    &lt;/&gt; .edward
                </a>
            </span>

            <SocialButtons />

            <span
                className={`
                    text-2xl
                    pointer-events-none
                `}
            >
                &copy;{ currentYear }
            </span>
        </footer>
    );
};