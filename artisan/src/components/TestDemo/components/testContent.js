export default {
  name: 'testContent',
  data() {
    return {
      title: 'test-title22222',
      content: 'testContent-testContent',
      model: '',
    }
  },
  props: {
    item: {type: Object}
  },
  render(h) {
    console.log(11111111)
    console.log(this.item)
    return (
      <div>
        <h2>{this.title}</h2>
        <span>{this.content}</span>
        --------------------------------
        <el-input type="text" onInput={e => this.item.firstName = e} value={this.item.firstName}/>
        <el-date-picker
          onInput={e => (this.item.time = e)}
          value={this.item.time}
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
          default-time="['8:00:00']"
        />
      </div>
    )
  },
  method: {
    inputx(event) {
      self.$emit('input', event.target.value);
    }
  }
}
