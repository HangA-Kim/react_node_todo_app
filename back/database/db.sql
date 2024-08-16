-- 테이블 생성 _id TEXT PRIMARY KEY, : uuid4 로 임의 저장한것. _id SERIAL PRIMARY KEY,: 자동 integer 로 저장됨
CREATE TABLE task (
    _id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    isCompleted BOOLEAN NOT NULL DEFAULT false,
    isImportant BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userId TEXT NOT NULL
);


-- 데이터 추가
INSERT INTO task ( title, description, date, isCompleted, isImportant, userId) 
VALUES ('할일1', '할일1 설명', '2024-02-11', false, false, 'foxbaboo@gmail.com')

INSERT INTO task ( _id, title, description, date, isCompleted, isImportant, userId) 
VALUES ('id', '할일1', '할일1 설명', '2024-02-11', false, false, 'foxbaboo@gmail.com')

-- 조회
SELECT * FROM task

-- 데이터 수정
UPDATE task SET key=value WHERE _id=id

-- 데이터 삭제
DELETE FROM task WHERE _id=id

-- 날짜 바꾸기 postgres : DB 이름
ALTER DATABASE postgres SET timezone = 'Asia/Seoul';

-- 테이블 삭제 DROP TABLE [database_name.]table_name;
DROP TABLE task;

-- function 작성 - update 시간 자동 설정
CREATE OR REPLACE FUNCTION update_time_and_user()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger - 각 테이블에 function 을 연결
CREATE TRIGGER update_trigger
BEFORE UPDATE ON task
FOR EACH ROW
EXECUTE PROCEDURE update_time_and_user();