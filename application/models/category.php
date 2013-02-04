<?php

class Category extends Eloquent
{
    
    public function goods()
    {
        return $this->has_many('Good');
    }
    
    public function goods_array()
    {
        return $this->has_many('Good')->take(12)->get();
    }
    
}