<?php


class Good extends Eloquent
{
    
    public $paginate = 500006;
    
    public function width()
    {
        return $this->attr_cloth_width;
    }
    
    public function sources()
    {
        return $this->has_many('Source');
    }
    
    
    public function paginate()
    {
        return 4000;
    }
    
}