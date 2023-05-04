# CANA RINN LAB Backend Server

# このプロゼクトに関して
- このプロゼクトは、自分がVRChat worldに使うサーバーでございます。

# 사전 표기
- 언어코드의 기본 규정은 ISO 639-1 표준을 따른다. 
- 言語コードの基本に関しては、ISO 639-1 標準を従います。
- VRChat은 그 특성으로 인하여, string반환이 강제되어있다. 이에 유의하여, string으로 return하는 함수로 편성한다. 또한, 차후 업데이트를 감안하여, json post도 남겨는 두자.
- VRCHATはその特性で、STRING returnが強制されています。(json parsingが難しい)。なので、可能であればstringでreturnするfunctionで作成する。

# VRC통신 규약
order 기준
order 基準

## load_book
- 책의 내용자체를 불러온다.
> 서버에서는 불러오는 역할만 하고, 그 외는 우동 네트워크로 제어권 등을 연결한다.
- arguments (POST)

|name|type|desc|
|----|----|----|
|bookcode|int|불러올 도서의 code|
|language|string|불러올 도서의 언어 ko,en,ja등|

- return

|name|type|desc|
|----|----|----|
|bookinside|string|책 내용, html로 서버에서 포팅.|

## Load_libs
- arguments (POST)

|name|type|desc|
|----|----|----|
|language|string|불러올 도서관의 언어 ko,en,ja등|

- return (POST)

|name|type|desc|
|----|----|----|
|books|book[]|불러올 도서관의 codes.|

- book 객체
```ts
class book {
    bookcode: number,
    bookname: string,
    auther  : string,
}
```

- 참조
- tb_bookinfo(code,lang,bookname,auther,bookinside,bookmeta)

