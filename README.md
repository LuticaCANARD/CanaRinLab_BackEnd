# CANA RINN LAB Backend Server

# 사전 표기
- 언어코드의 기본 규정은 ISO 639-1 표준을 따른다.
- 

# VRC통신 규약
order 기준

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
|bookname|string|책의 이름|
|auther|string|책의 작가|
|bookinside|string|책 내용, html로 서버에서 포팅.|
|bookmeta|string|책의 정보|

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
    bookcode: string,
    bookname: string,
    auther  : string,
}
```

- 참조
- tb_bookinfo(code,lang,bookname,auther,bookinside,bookmeta)

