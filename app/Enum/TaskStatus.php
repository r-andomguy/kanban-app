<?php

namespace App;

enum TaskStatus: int
{
    case TODO = 1;
    case IN_PROGRESS = 2;
    case DONE = 3;

    public function description(): string
    {
        return match($this) 
        {
            self::TODO => 'To Do',
            self::IN_PROGRESS => 'In Progress',
            self::DONE => 'Done',
        };
    }
}
