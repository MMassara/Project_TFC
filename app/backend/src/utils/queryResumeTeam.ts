const queryResumeTeam = `SELECT t1.team_name as name, (SUM(CASE WHEN t2.home_team_goals 
    > t2.away_team_goals THEN 3 ELSE 0 END) 
+ SUM(CASE WHEN t2.home_team_goals = t2.away_team_goals THEN 1 ELSE 0 END)) as totalPoints, 
(SUM(CASE WHEN t2.home_team_id = t1.id THEN 1 ELSE 0 END)) as totalGames,
(SUM(CASE WHEN t2.home_team_goals > t2.away_team_goals THEN 1 ELSE 0 END)) as totalVictories,
(SUM(CASE WHEN t2.home_team_goals = t2.away_team_goals THEN 1 ELSE 0 END)) as totalDraws,
(SUM(CASE WHEN t2.home_team_goals < t2.away_team_goals THEN 1 ELSE 0 END)) as totalLosses,
(SUM(t2.home_team_goals)) as goalsFavor,
(SUM(t2.away_team_goals)) as goalsOwn
FROM TRYBE_FUTEBOL_CLUBE.teams as t1
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches as t2
ON t1.id = t2.home_team_id
WHERE t2.in_progress = 0
GROUP BY name;`;

export default queryResumeTeam;
