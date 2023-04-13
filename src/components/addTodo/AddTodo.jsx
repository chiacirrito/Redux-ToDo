import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, updateTodo } from "../../redux/actions";
import { BiPlus, BiEdit } from "react-icons/bi";
import styles from "./index.module.scss";

export const AddTodo = () => {
  const [value, setValue] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state.todoReducer.isEdit);
  const editTodo = useSelector((state) => state.todoReducer.editTodo);

  useEffect(() => {
    editTodo && setValue(() => editTodo);
  }, [editTodo]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!value?.title) {
      setError((error) => ({
        ...error,
        title: "Please enter todo title",
      }));
      return;
    }

    if (isEdit) {
      dispatch(updateTodo(editTodo.id, value));
    } else {
      dispatch(addNewTodo(value));
    }
    setValue({ title: "" });
    document.getElementById("todoForm").reset();
  };

  const changeEvent = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    if (e?.target?.name === "title") {
      setError({
        title: "",
      });
    }
  };

  return (
    <div className={styles.Container}>
      <form id="todoForm" onSubmit={onSubmit}>
        <div className={styles.add}>
          <input
            type="text"
            name="title"
            className={styles.row}
            placeholder="Todo Title"
            defaultValue={value?.title}
            onChange={(e) => changeEvent(e)}
          />
          <button className={styles.btn} type="submit">
            {isEdit ? <BiEdit /> : <BiPlus />}
          </button>
        </div>
        <span className={styles.error}>{error?.title}</span>
      </form>
    </div>
  );
};
