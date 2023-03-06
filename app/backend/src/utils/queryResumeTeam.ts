const queryResumeTeam = `SELECT 
t1.team_name AS name, 
(SUM(CASE WHEN t2.home_team_goals > t2.away_team_goals THEN 3 ELSE 0 END) + 
SUM(CASE WHEN t2.home_team_goals = t2.away_team_goals THEN 1 ELSE 0 END)) AS totalPoints, 
(SUM(CASE WHEN t2.home_team_id = t1.id THEN 1 ELSE 0 END)) AS totalGames,
(SUM(CASE WHEN t2.home_team_goals > t2.away_team_goals THEN 1 ELSE 0 END)) AS totalVictories,
(SUM(CASE WHEN t2.home_team_goals = t2.away_team_goals THEN 1 ELSE 0 END)) AS totalDraws,
(SUM(CASE WHEN t2.home_team_goals < t2.away_team_goals THEN 1 ELSE 0 END)) AS totalLosses,
(SUM(t2.home_team_goals)) AS goalsFavor,
(SUM(t2.away_team_goals)) AS goalsOwn,
(SUM(t2.home_team_goals - t2.away_team_goals)) AS goalsBalance,
ROUND(((SUM(CASE WHEN t2.home_team_goals > t2.away_team_goals THEN 3 
    WHEN t2.home_team_goals = t2.away_team_goals THEN 1 ELSE 0 END) 
    / (SUM(CASE WHEN t2.home_team_id = t1.id THEN 1 ELSE 0 END) * 3)) * 100), 2) AS efficiency
FROM 
TRYBE_FUTEBOL_CLUBE.teams AS t1
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS t2 ON t1.id = t2.home_team_id
WHERE 
t2.in_progress = 0
GROUP BY 
name
ORDER BY 
totalPoints DESC, 
totalVictories DESC, 
goalsBalance DESC, 
goalsFavor DESC, 
goalsOwn DESC;`;

export default queryResumeTeam;
