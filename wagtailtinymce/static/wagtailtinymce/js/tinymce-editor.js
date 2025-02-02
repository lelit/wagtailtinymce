/*
Copyright (c) 2016, Isotoma Limited
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the Isotoma Limited nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL ISOTOMA LIMITED BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var mcePlugins = ['hr', 'code', 'fullscreen', 'noneditable', 'paste', 'table', 'lists', 'link'],
    mceTools = ['inserttable'],
    mceExternalPlugins = {};

function registerMCEPlugin(name, path, language) {
    if (path) {
        mceExternalPlugins[name] = path;
        if (language) {
            tinymce.PluginManager.requireLangPack(name, language);
        }
    } else {
        mcePlugins.push(name);
    }
}

function registerMCETool(name) {
    mceTools.push(name);
}

function makeTinyMCEEditable(id, kwargs) {

    kwargs = kwargs || {};
    $.extend(kwargs, {
        selector: '#' + id.toString(),
        plugins: mcePlugins,
        tools: mceTools,
        external_plugins: mceExternalPlugins,
        branding: false,
        setup: function (editor) {
            editor.on('change', function () {
                editor.save();
            });
        }
    });

    setTimeout(function () {
        tinymce.init(kwargs);
    }, 1);
}
