import { Show } from 'solid-js'
import IconEnv from './icons/Env'
import IconX from './icons/X'
import type { Accessor, Setter } from 'solid-js'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
}

export default (props: Props) => {
  let systemInputRef: HTMLTextAreaElement

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
  }

  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div>
            <div class="fi gap-1 op-50 dark:op-60">
              <Show when={props.canEdit()} fallback={<IconEnv />}>
                <span onClick={() => props.setCurrentSystemRoleSettings('')} class="sys-edit-btn p-1 rd-50%" > <IconX /> </span>
              </Show>
              <div>自定义场景</div>
            </div>
            <div class="mt-1">
              {props.currentSystemRoleSettings()}
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="sys-edit-btn">
            <IconEnv />
            <span>自定义场景</span>
          </span>
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="fi gap-1 op-50 dark:op-60">
            <IconEnv />
            <span text-sm ml-1>自定义场景</span>
          </div>
          <p class="my-2 leading-normal text-sm op-50 dark:op-60">通过 system message 设定指令、角色、情境等</p>
          <div>
            <textarea
              ref={systemInputRef!}
              placeholder="比如：任务：作为prompt工程师，根据我的描述，生成Prompt指令。
                                背景：我是一个不太懂电脑的人，你首先询问我的顶层需求。我给出顶层需求后，你会根据我的顶层需求，识别出完成这条顶层需求所需的关键信息，给出一条结构化的Prompt指令。
                                输出：输出是一条Chatgpt能够执行的Prompt指令模板。这条指令应包括名称，输入，输出等部分。执行这条指令后，要求进一步输入满足任务的关键信息，输入后能够生成满足顶层需求+关键信息的具体输出。"
              autocomplete="off"
              autofocus
              rows="3"
              gen-textarea
            />
          </div>
          <button onClick={handleButtonClick} gen-slate-btn>
            保存
          </button>
        </div>
      </Show>
    </div>
  )
}
