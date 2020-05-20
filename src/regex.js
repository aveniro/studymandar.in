export default {
    chineseScript: /^[^a-zA-Z\d\s]+$/,
    pinyin: /^([a-z]{2,7}\d\s?)+$/,
    translation: /^.{0,100}$/,

    email: /^[a-zA-Z\d\._-]{1,20}@[a-zA-Z\d\._-]{1,20}\.[a-zA-Z\d]{1,20}$/,
    password: /^[a-zA-Z\d_\-<>!@#$%^&*()[\]{}\.,/?=+\|\\`~;:'"]{4,}$/
};