import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import { Note } from "../models/data";
import { useEffect, useState } from "react";
import "../pages/Note.css";

interface TagsContainerProps {
  tags: Set<string>;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

const TagsContainer: React.FC<TagsContainerProps> = ({
  tags,
  addTag,
  removeTag,
}) => {
  const [state, setState] = useState<Set<string>>(tags);

  useEffect(() => {
    console.log("tags", tags);
    setState(new Set(...tags));
  }, [tags]);

  return (
    <div id="footer-container">
      <div id="resize">
        {[...tags].map((tag, index) => (
          <IonChip key={index}>
            <IonLabel>{tag}</IonLabel>
            <IonIcon
              onClick={() => {
                removeTag(tag);
                setState(new Set(...state));
              }}
              icon={closeCircle}
            ></IonIcon>
          </IonChip>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTag(
              (document.getElementById("tag-input") as HTMLInputElement).value,
            );
            (document.getElementById("tag-input") as HTMLInputElement).value =
              "";
            setState(new Set(...state));
          }}
          color={"light"}
        >
          <input type="text" placeholder="tag" id="tag-input" />
        </form>
      </div>
    </div>
  );
};

export default TagsContainer;
