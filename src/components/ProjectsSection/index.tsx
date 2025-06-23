// components
import CustomButton from "../CustomButton";

// icons
import { CiCircleCheck } from "react-icons/ci";
import { FaFigma } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";

// projects section
export default function ProjectsSection(){
    return(
        <section>
            <h2>
                Projects
            </h2>

            <div>
                <div>
                    <div>
                        <div>
                            <div>
                                <CiCircleCheck />
                                <span>
                                    Constant Progress
                                </span>
                            </div>
                            <h3>
                                MCN API
                            </h3>
                        </div>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem libero facilis culpa dolorum? Sit eligendi iusto excepturi, beatae voluptatem magni asperiores reprehenderit eos nostrum autem! Rem adipisci nihil laboriosam veritatis.
                        </p>
                    </div>

                    <div>
                        <div>
                            <CustomButton variant="no-icon" backgroundColor="#346259">
                                View Deploy
                            </CustomButton>
                            <CustomButton variant="just-icon" >
                                <FaFigma />
                            </CustomButton>
                        </div>

                        <div>
                            <span>
                                More info <HiMagnifyingGlass />
                            </span>
                        </div>
                    </div>
                </div>

                <aside>
                    
                </aside>
            </div>
        </section>
    );
};