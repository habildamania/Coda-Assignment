CREATE TABLE `ratings` (
  `uId` int NOT NULL,
  `mId` int NOT NULL,
  `ratings` int DEFAULT NULL,
  KEY `User Id_idx` (`uId`) /*!80000 INVISIBLE */,
  KEY `Movie Id_idx` (`mId`),
  CONSTRAINT `User Id` FOREIGN KEY (`uId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
