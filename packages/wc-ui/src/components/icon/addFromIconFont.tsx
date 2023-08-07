import { Component, h } from '@stencil/core';

@Component({
    tag: 'wc-icon-font',
    shadow: true
})
export class Icon {
    render() {
        return <svg fill="currentColor" viewBox="0 0 1024 1024" width="1em" height="1em">
            <path d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0zM512 960C264.576 960 64 759.424 64 512S264.576 64 512 64s448 200.576 448 448S759.424 960 512 960z m-64-448h128V256H448v256H320V448h128V320h128v128z"></path>
        </svg>;
    }
}