"use client";
import { experiencesLabels } from "@/modules/experiences/config/labels";

import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { experiences } from "../config/experiences";
import { useExperience } from "../hooks/use-experience";

export function ExperienceList() {
  const { active, selectExperience } = useExperience();
  return (
    <div className="experience-layout">
      <div className="experience-image">
        <Image
          key={experiences[active].image}
          src={experiences[active].image}
          alt={experiences[active].name}
          fill
          sizes="(max-width:800px) 100vw, 50vw"
        />
        <span className="experience-caption">THE LUXURY OF A LITTLE LESS.</span>
      </div>
      <div className="experience-copy">
        <p className="eyebrow">NOTHING TO RUSH. EVERYTHING TO FEEL.</p>
        <h2>
          Days that unfold
          <br />
          <em>naturally.</em>
        </h2>
        <div className="experience-accordion">
          {experiences.map((e, i) => (
            <div
              key={e.name}
              className={active === i ? "experience-active" : ""}
            >
              <button
                aria-expanded={active === i}
                aria-controls={"experience-" + i}
                onClick={() => selectExperience(i)}
              >
                <span className="item-number">
                  {experiencesLabels.action0}
                  {i + 1}
                </span>
                <span>{e.name}</span>
                {active === i ? <Minus size={17} /> : <Plus size={17} />}
              </button>
              <div id={"experience-" + i} hidden={active !== i}>
                <p>{e.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Link className="text-link" href="/experiences">
          {experiencesLabels.exploreTheExperiences}
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </div>
  );
}
