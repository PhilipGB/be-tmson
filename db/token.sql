\c be_tmson

SELECT 
    (SELECT COUNT(token_id) FROM tokens) AS total_tokens,
    COUNT(token_id) as transactions_since_jan_2022
FROM 
    token_transactions
WHERE 
    transaction_time > '2022-01-01T00:00:00.000Z'
;