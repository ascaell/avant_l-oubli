const state = {
    open: false,
    speaker: '',
    lines: [],
    index: 0,
};

export function openDialogue(name, lines)
{
    if (!lines || lines.length === 0)
        return;
    state.open = true;
    state.speaker = name;
    state.lines = lines;
    state.index = 0;
}

export function advanceDialogue()
{
    if (!state.open)
        return false;
    state.index++;
    if (state.index >= state.lines.length) {
        closeDialogue();
        return false;
    }
    return true;
}

export function closeDialogue()
{
    state.open = false;
    state.speaker = '';
    state.lines = [];
    state.index = 0;
}

export function isDialogueOpen()
{
    return state.open;
}
