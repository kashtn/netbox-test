import { useEffect, useState } from "react";

export default function Table() {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  function showTable() {
    setVisible(!visible);
  }

  useEffect(() => {
    async function getData() {
      let response = await fetch("https://frontend-test.netbox.ru/");
      let result = await response.json();
      result.forEach((person) => [(person[0].id = Math.random())]);
      setData(result);
    }
    getData();
  }, []);

  async function addPerson() {
    setData((prevData) => {
      return [
        ...prevData,
        [
          {
            field: "ID",
            value: data.length + 1,
            type: "integer",
            id: Math.random(),
          },
          { field: "Name", value: "name", type: "string" },
          { field: "Age", value: "age", type: "integer" },
          { field: "Phone", value: "tel", type: "string" },
          { field: "E-mail", value: "email", type: "string" },
        ],
      ];
    });
  }

  async function editPerson(group, e) {
    let currentId = e.target.parentElement.parentElement.id;
    let currentTr = document.getElementById(currentId);
    let currentTds = currentTr.getElementsByTagName("td");
    let editButton = currentTr.querySelector(".editButton");

    if (editButton.innerText === "EDIT") {
      Object.values(currentTds).forEach((el) =>
        el.setAttribute("contentEditable", true)
      );
      editButton.innerText = "SAVE";
    } else {
      let [newId, newName, newAge, newTel, newEmail] = Object.values(
        currentTds
      ).map((td) => td.innerText);

      setData((prevData) => {
        let newData = prevData.map((person) => {
          if (person[0].id === group[0].id) {
            person[0].value = newId;
            person[1].value = newName;
            person[2].value = newAge;
            person[3].value = newTel;
            person[4].value = newEmail;
            return person;
          } else return person;
        });
        return newData;
      });

      const response = await fetch(
        "https://frontend-test.netbox.ru/method=update",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(newId, newName, newAge, newTel, newEmail),
        }
      );
      await response.json();
      Object.values(currentTds).forEach((el) =>
        el.setAttribute("contentEditable", false)
      );
      editButton.innerText = "Edit";
    }
  }

  async function deletePerson(group) {
    let currentId = group[0].value;
    const response = await fetch(
      "https://frontend-test.netbox.ru/method=delete",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(currentId),
      }
    );
    await response.json();
    let arr = data.filter((person) => person[0].value !== currentId);
    setData(arr);
  }

  return (
    <>
      <button onClick={showTable}>Toggle table</button>
      <div style={{ display: visible ? "inline-block" : "none" }}>
        <table align="center">
          {data &&
            data.map((group) => (
              <>
                <thead>
                  <tr>
                    {group.map((person) => (
                      <>
                        <th key={Math.random()}>{person.field}</th>
                        {person.field === "E-mail" && <th></th>}
                      </>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr key={group[0].value} id={Math.random()}>
                    {group.map((person) => (
                      <>
                        <td key={Math.random()}>{person.value}</td>
                      </>
                    ))}
                    <th>
                      <button
                        className="editButton"
                        onClick={(e) => {
                          editPerson(group, e);
                        }}
                      >
                        edit
                      </button>
                      <button
                        className="deleteButton"
                        onClick={() => {
                          deletePerson(group);
                        }}
                      >
                        delete
                      </button>
                    </th>
                  </tr>
                </tbody>
              </>
            ))}
        </table>
        <button id="addButton" onClick={addPerson}>
          Add new
        </button>

        <h3>Всего: {data && data.length}</h3>
      </div>
    </>
  );
}
