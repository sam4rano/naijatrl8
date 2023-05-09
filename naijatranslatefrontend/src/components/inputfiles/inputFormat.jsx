

const InputFormat = () => {
  return (
    <form>
      <select className="text-primary outline outline-offset-0  rounded-full px-lg h-[30px] outline-1">
        <option value="text">text</option>
        <option value="speech">speech</option>
      </select>
    </form>
  );
}

export default InputFormat