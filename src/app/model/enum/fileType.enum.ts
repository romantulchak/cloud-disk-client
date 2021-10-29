export class FileType{
    public readonly FILE_TYPES = [
        {
            type: []
        }
    ];
    constructor(){
        this.FILE_TYPES.push(
            {type: this.RAR},
            {type: this.WORD},
            {type: this.PDF},
            {type: this.EXCEL},
            {type: this.IMG},
            {type: this.EXE},
            {type: this.TXT},
            {type: this.JAR},
            {type: this.TGA},
            {type: this.SVG},
            {type: this.TORRENT},
            {type: this.CODE},
            {type: this.MP4},
            {type: this.JSON},
            {type: this.PPT},
        )
    }


    public readonly RAR = ["rar", "zip"];
    public readonly WORD = ["doc", "docx", "odt"];
    public readonly PDF = ["pdf"];
    public readonly EXCEL = ["xls", "xlsx"];
    public readonly IMG = ["jpg", "jfif", "png", "bmp", "jpeg", "ico"];
    public readonly EXE = ["exe", "msi"];
    public readonly TXT = ["txt", "cfg", "res", "htm", "html", "log", "sii"];
    public readonly JAR = ["jar"];
    public readonly TGA = ["tga"];
    public readonly SVG = ["svg"];
    public readonly TORRENT = ["torrent"];
    public readonly CODE = ["java", "py", "cs", "gradle", "ts", "js"];
    public readonly MP4 = ["mp4", "mp3", "webm", "avi", "wmv"];
    public readonly JSON = ["json"];
    public readonly PPT = ["ppt", "pptx"];

}