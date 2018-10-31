var SERVER = "/";

/*
if (window.location.hostname == 'codeology.lhx')
    SERVER = "http://codeology.lhx/";
if (window.location.hostname == '54.191.204.67')
    SERVER = "http://54.191.204.67/";
if (window.location.hostname == 'codeology.braintreepayments.com')
    SERVER = "http://codeology.braintreepayments.com/";
if (window.location.hostname == 'localhost')
    SERVER = "http://codeology.braintreepayments.com/";
*/
SERVER = SERVER.replace('http:', window.location.protocol);

var TYPES_STRING = 'unknown, JavaScript, HTML, Ruby, Java, PHP, Python, C, C++, CSS, Shell, C#, Objective-C, Perl, CoffeeScript, Go, Scala, VimL, R, Haskell, Clojure, Lua, Groovy, Emacs Lisp, Erlang, Puppet, TeX, Swift, Matlab, ActionScript, Arduino, Batchfile, GLSL, OCaml, Tcl, Visual Basic, TypeScript, D, Assembly, Common Lisp, Dart, Prolog, XSLT, PowerShell, Scheme, FORTRAN, Rust, ASP, Processing, Julia, F#, Elixir, ColdFusion, Vala, Apex, Racket, VHDL, Pascal, Smalltalk, Haxe, Verilog, Logos, Delphi, Makefile, Kotlin, AutoHotkey, CMake, QMake, UnrealScript, LiveScript, HaXe, BlitzBasic, IDL, Standard ML, XML, SQL, OpenEdge ABL, Objective-C++, AppleScript, SuperCollider, PureScript, Eiffel, Elm, Gosu, M, Smarty, Pure Data, nesC, XQuery, SQF, Scilab, DOT, Postscript, Cuda, Slash, Max, Game Maker Language, AutoIt, Mathematica, SourcePawn, Groff';
var TYPES = TYPES_STRING.split(', ');

var MOBILE_VERSION = window.mobileAndTabletcheck();
var SKIP_INTRO = false;
var HISTORY_ENABLED = true;
var MIN_FPS = 10;

var ZOOM_IN_MIN = 300;
var ZOOM_IN_MAX = 900;
var ZOOM_IN = 500;

var asciiShader = {enabled: true};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb25maWcuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIFNFUlZFUiA9IFwiL1wiO1xyXG5cclxuLypcclxuaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PSAnY29kZW9sb2d5LmxoeCcpXHJcbiAgICBTRVJWRVIgPSBcImh0dHA6Ly9jb2Rlb2xvZ3kubGh4L1wiO1xyXG5pZiAod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lID09ICc1NC4xOTEuMjA0LjY3JylcclxuICAgIFNFUlZFUiA9IFwiaHR0cDovLzU0LjE5MS4yMDQuNjcvXCI7XHJcbmlmICh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT0gJ2NvZGVvbG9neS5icmFpbnRyZWVwYXltZW50cy5jb20nKVxyXG4gICAgU0VSVkVSID0gXCJodHRwOi8vY29kZW9sb2d5LmJyYWludHJlZXBheW1lbnRzLmNvbS9cIjtcclxuaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PSAnbG9jYWxob3N0JylcclxuICAgIFNFUlZFUiA9IFwiaHR0cDovL2NvZGVvbG9neS5icmFpbnRyZWVwYXltZW50cy5jb20vXCI7XHJcbiovXHJcblNFUlZFUiA9IFNFUlZFUi5yZXBsYWNlKCdodHRwOicsIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCk7XHJcblxyXG52YXIgVFlQRVNfU1RSSU5HID0gJ3Vua25vd24sIEphdmFTY3JpcHQsIEhUTUwsIFJ1YnksIEphdmEsIFBIUCwgUHl0aG9uLCBDLCBDKyssIENTUywgU2hlbGwsIEMjLCBPYmplY3RpdmUtQywgUGVybCwgQ29mZmVlU2NyaXB0LCBHbywgU2NhbGEsIFZpbUwsIFIsIEhhc2tlbGwsIENsb2p1cmUsIEx1YSwgR3Jvb3Z5LCBFbWFjcyBMaXNwLCBFcmxhbmcsIFB1cHBldCwgVGVYLCBTd2lmdCwgTWF0bGFiLCBBY3Rpb25TY3JpcHQsIEFyZHVpbm8sIEJhdGNoZmlsZSwgR0xTTCwgT0NhbWwsIFRjbCwgVmlzdWFsIEJhc2ljLCBUeXBlU2NyaXB0LCBELCBBc3NlbWJseSwgQ29tbW9uIExpc3AsIERhcnQsIFByb2xvZywgWFNMVCwgUG93ZXJTaGVsbCwgU2NoZW1lLCBGT1JUUkFOLCBSdXN0LCBBU1AsIFByb2Nlc3NpbmcsIEp1bGlhLCBGIywgRWxpeGlyLCBDb2xkRnVzaW9uLCBWYWxhLCBBcGV4LCBSYWNrZXQsIFZIREwsIFBhc2NhbCwgU21hbGx0YWxrLCBIYXhlLCBWZXJpbG9nLCBMb2dvcywgRGVscGhpLCBNYWtlZmlsZSwgS290bGluLCBBdXRvSG90a2V5LCBDTWFrZSwgUU1ha2UsIFVucmVhbFNjcmlwdCwgTGl2ZVNjcmlwdCwgSGFYZSwgQmxpdHpCYXNpYywgSURMLCBTdGFuZGFyZCBNTCwgWE1MLCBTUUwsIE9wZW5FZGdlIEFCTCwgT2JqZWN0aXZlLUMrKywgQXBwbGVTY3JpcHQsIFN1cGVyQ29sbGlkZXIsIFB1cmVTY3JpcHQsIEVpZmZlbCwgRWxtLCBHb3N1LCBNLCBTbWFydHksIFB1cmUgRGF0YSwgbmVzQywgWFF1ZXJ5LCBTUUYsIFNjaWxhYiwgRE9ULCBQb3N0c2NyaXB0LCBDdWRhLCBTbGFzaCwgTWF4LCBHYW1lIE1ha2VyIExhbmd1YWdlLCBBdXRvSXQsIE1hdGhlbWF0aWNhLCBTb3VyY2VQYXduLCBHcm9mZic7XHJcbnZhciBUWVBFUyA9IFRZUEVTX1NUUklORy5zcGxpdCgnLCAnKTtcclxuXHJcbnZhciBNT0JJTEVfVkVSU0lPTiA9IHdpbmRvdy5tb2JpbGVBbmRUYWJsZXRjaGVjaygpO1xyXG52YXIgU0tJUF9JTlRSTyA9IGZhbHNlO1xyXG52YXIgSElTVE9SWV9FTkFCTEVEID0gdHJ1ZTtcclxudmFyIE1JTl9GUFMgPSAxMDtcclxuXHJcbnZhciBaT09NX0lOX01JTiA9IDMwMDtcclxudmFyIFpPT01fSU5fTUFYID0gOTAwO1xyXG52YXIgWk9PTV9JTiA9IDUwMDtcclxuXHJcbnZhciBhc2NpaVNoYWRlciA9IHtlbmFibGVkOiB0cnVlfTsiXSwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
