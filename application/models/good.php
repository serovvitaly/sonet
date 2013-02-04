<?php


class Good extends Eloquent
{
    
    public function width()
    {
        return $this->attr_cloth_width;
    }
    
    public function sources()
    {
        return $this->has_many('Source');
    }
    
}