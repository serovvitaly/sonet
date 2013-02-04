<?php

class Category extends Eloquent
{
    
    public static $per_page = 12;
    
    public function goods()
    {
        return $this->has_many('Good');
    }
    
    public function goods_array()
    {
        return $this->has_many('Good')->take( self::$per_page )->get();
    }
    
    
    public function paginate()
    {            
        $paginate = Paginator::make($this->goods(), $this->goods()->count(), self::$per_page);
        
        $paginate->page = (Input::get('ct') == $this->id) ? Input::get('page') : 1;
        
        $paginate->html_classes['active']        = 'current-menu-item';
        $paginate->html_classes['previous_page'] = 'prev';
        $paginate->html_classes['next_page']     = 'next';
        
        $paginate->html_text['previous_page']    = ' ';
        $paginate->html_text['next_page']        = ' ';
        
        
        $paginate->appends(array('ct' => $this->id));
        
        
        
        return $paginate->links();
    }
    
}