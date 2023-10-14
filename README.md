# CANA RINN LAB Backend Server

# このプロゼクトに関して
- このプロゼクトは、自分がVRChat worldに使うサーバーでございます。
- 今のところ、したにある文書はCana rin 図書館というプロゼクトの文書であります

# 사전 표기
- 언어코드의 기본 규정은 ISO 639-1 표준을 따른다. 
- 言語コードの基本に関しては、ISO 639-1 標準を従います。





$ 개인서버임


# VRC통신 규약
order 기준    
order 基準

- VRCUrl의 수정불가성으로 인하여, load_libs와 load_book는 병합될 예정이며, 토큰으로 분리할 예정임.

## load_book
- 책의 내용자체를 불러온다.
- 本の内容をロードします。
> 서버에서는 불러오는 역할만 하고, 그 외는 우동 네트워크로 제어권 등을 연결한다.
- arguments (get)

|name|type|desc|
|----|----|----|
|bookcode|int|불러올 도서의 code|
|language|string|불러올 도서의 언어 ko,en,ja등|

- return

|name|type|desc|
|----|----|----|
|bookinside|string|책 내용, html로 서버에서 포팅.|

## Load_libs
- arguments (get)

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

```
npx prisma generate
```



### 문서 작성시 태그 기능

|태그|내용|
|---|---|
|```<color="색> 또는 <#색값> </color>```|텍스트 색상|
|```<b></b>```|굵은 글씨|
|```<i></i>```|기울임|
|```<u></u>```|밑줄|
|```<s></s>```|취소선|
|```<sup></sup>```|상단 글자|
|```<sub></sub>```|하단 글자|
|```<mark></mark>```|하이라이트 |
|```<cspace=크기></cspace>```|	글자 사이의 간격, 크기만큼 띄어짐|
|```<mspace=크기></mspace>```|	크기가 0이면 글자 사이의 간격이 없어짐|
|```<line-height=크기></line-height>```|	개행 간격|
|```<size=크기%></size>```|	 크기만큼 글자의 사이즈가 작거나 커짐|
|```<align=left,center,right></align>```|	글자의 정렬 기능|
|```<style=미리 정의한 스타일 이름></style>```|	미리 정의한 tag가 설정됨|
|```<font=폰트 이름 material = 폰트의 메터리얼 이름></font>```|	하나의 TextMeshPro에서 다른 폰트를 사용할 수 있음|
