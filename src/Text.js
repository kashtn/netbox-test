import { useState } from "react";
import Button from "@material-ui/core/Button";

export default function Text() {
  const [visible, setVisible] = useState(false);
  function showText() {
    setVisible(!visible);
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={showText}>
        Toggle text
      </Button>
      <div
        style={{ display: visible ? "block" : "none" }}
        className="container"
      >
        <div className="container-inner">
          <div className="empty" />
          <div className="container-text">
            <p>
              Базовые сценарии поведения пользователей освещают чрезвычайно
              интересные особенности картины в целом, однако конкретные выводы,
              разумеется, своевременно верифицированы. Также как
              социально-экономическое развитие способствует повышению качества
              системы массового участия.
            </p>
            <p>
              Принимая во внимание показатели успешности, высококачественный
              прототип будущего проекта в значительной степени обусловливает
              важность новых принципов формирования материально-технической и
              кадровой базы.
            </p>
            <p>
              Предварительные выводы неутешительны: синтетическое тестирование
              обеспечивает актуальность существующих финансовых и
              административных условий. Следует отметить, что современная
              методология разработки позволяет оценить значение новых принципов
              формирования материально-технической и кадровой базы.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
