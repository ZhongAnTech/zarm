import React, { Component } from 'react';
import { ValidForm, Input, Panel, Cell } from '../../components';

class ValidFormPage extends Component {
  render() {
    return (
      <div className="cell-page">
        <Panel>
          <Panel.Header>
            <Panel.Title>表单验证</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Cell title="字符串">
              <ValidForm.ValidInput name="username" maxLength="10" minLength="2" onChange={(value, validate) => { console.log(value, validate); }}>
                <Input type="text" placeholder="长度在2到10之间" />
              </ValidForm.ValidInput>
            </Cell>
            <Cell title="数字">
              <ValidForm.ValidInput name="number" max="100" min="10" onChange={(value, validate) => { console.log(value, validate); }}>
                <Input type="text" placeholder="大小在10到100之间" />
              </ValidForm.ValidInput>
            </Cell>
            <Cell title="密码">
              <ValidForm.ValidInput name="number" maxLength="10" minLength="2" onChange={(value) => { this.password = value; }}>
                <Input type="password" placeholder="密码" />
              </ValidForm.ValidInput>
            </Cell>
            <Cell title="再次输入密码">
              <ValidForm.ValidInput name="number" maxLength="10" minLength="2"
                func={value => value && value === this.password}
                onChange={(value, validate) => { console.log(value, validate); }}>

                <Input type="password" placeholder="再次输入密码" />
              </ValidForm.ValidInput>
            </Cell>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

// 完整的写法, 由于 ValidInput 必须是 ValidForm的下一级，所以一般不会使用 ValidForm;

// <ValidForm onChange={(value, validate) => {console.log(value, validate)}}>
//   <ValidInput name="username" maxLength="10" onChange={(value, validate) => {console.log(value, validate)}}>
//     <input type="text"/>
//   </ValidInput>
//   <ValidInput name="password" required={true} max="10" onBlur={(val) => {console.log(val)}}>
//     <input type="password"/>
//   </ValidInput>
// </ValidForm>

export default ValidFormPage;
