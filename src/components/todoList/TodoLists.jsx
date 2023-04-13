import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../../redux/actions";
import { TfiTrash } from "react-icons/tfi";
import { BiEdit } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import styles from "./index.module.scss";

export const TodoLists = () => {
  const [isDone, setIsDone] = useState(false);
  const todos = useSelector((state) => state.todoReducer.todos);
  const dispatch = useDispatch();

  const actionClick = (data) => {
    if (data && data?.type === "edit") {
      dispatch(editTodo(data?.todo?.id));
    } else if (data && data?.type === "delete") {
      dispatch(deleteTodo(data?.todo?.id));
    }
  };

  return (
    <div className={styles.Container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.text}>
            <th>To Do :</th>
            <th onClick={() => setIsDone((val) => !val)}>
              <AiOutlineFileDone className={styles.done} />
            </th>
          </tr>
        </thead>

        <tbody>
          {todos &&
            todos.map((todo, index) => (
              <tr key={index}>
                <td>
                  {isDone ? <MdDone /> : ""}
                  {todo?.title}
                </td>
                <td>
                  <div className={styles.divBtn}>
                    <button
                      className={styles.icon}
                      onClick={() => actionClick({ todo: todo, type: "edit" })}
                    >
                      <BiEdit />
                    </button>
                    <button
                      className={styles.icon}
                      onClick={() =>
                        actionClick({ todo: todo, type: "delete" })
                      }
                    >
                      <TfiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
